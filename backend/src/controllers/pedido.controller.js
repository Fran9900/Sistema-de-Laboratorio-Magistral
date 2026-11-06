import { Op } from 'sequelize';
import db from '../config/db.js';
import { generarPinUnico } from '../services/pinService.js';
import { calcularGramosRequeridos } from '../utils/calculoFarmaceutico.js';

export const createPedido = async (req, res) => {
  try {
    const {
      recetaId,
      principioActivoId,
      principioActivoTexto,
      nombreCliente,
      dniCliente,
      telefonoCliente,
      origenPedido,
      precio,
      dosis,
      csp,
      urgente
    } = req.body;

    if (!nombreCliente || !telefonoCliente || !dosis || !csp) {
      return res.status(400).json({ error: 'Faltan campos obligatorios para registrar el pedido.' });
    }

    const gramosRequeridos = calcularGramosRequeridos(dosis, csp);
    const tieneStock = req.tieneStock !== undefined
      ? req.tieneStock
      : (req.principioActivo ? Number(req.principioActivo.stockDisponible || 0) >= gramosRequeridos : false);
    const principioActivo = req.principioActivo;
    const esUrgente = urgente === true || urgente === 'true';

    const fechaBase = new Date();
    let diaHoraRetiro;

    if (esUrgente) {
      diaHoraRetiro = fechaBase;
    } else {
      const horas = tieneStock ? 24 : 48;
      diaHoraRetiro = new Date(fechaBase.getTime() + horas * 60 * 60 * 1000);
    }

    const pinControl = await generarPinUnico(async (pin) => {
      const existe = await db.Pedido.findOne({
        where: {
          pinControl: pin,
          estadoPedido: { [Op.notIn]: ['entregado', 'cancelado'] }
        }
      });
      return Boolean(existe);
    });

    const estadoInicial = origenPedido === 'email' || origenPedido === 'mostrador' ? 'pendiente_pago' : 'ingresado';

    const nuevoPedido = await db.Pedido.create({
      recetaId,
      principioActivoId: principioActivo ? principioActivo.id : (principioActivoId ? Number(principioActivoId) : null),
      principioActivoTexto: principioActivoTexto ? String(principioActivoTexto).trim() : null,
      nombreCliente,
      dniCliente: dniCliente || null,
      telefonoCliente,
      origenPedido: origenPedido || 'mostrador',
      precio: precio !== undefined ? Number(precio) : 0.00,
      dosis,
      csp,
      urgente: esUrgente,
      pinControl,
      diaHoraRetiro,
      estadoPedido: estadoInicial
    });

    if (!tieneStock && principioActivo) {
      try {
        await db.PedidoDrogueria.create({
          pedidoId: nuevoPedido.id,
          principioActivoId: principioActivo.id,
          cantidadSolicitada: `Envase materia prima x 100 g (Requerido: ${gramosRequeridos} g)`,
          estadoSolicitud: 'pendiente',
          respuestaApi: JSON.stringify({
            origen: 'reposicion_automatica_falta_stock',
            pedidoId: nuevoPedido.id,
            principioActivo: principioActivo.nombre,
            gramosRequeridos,
            fecha: new Date().toISOString()
          })
        });
      } catch (errDrogueria) {
        console.error('Error al registrar pedido a drogueria:', errDrogueria.message);
      }
    }

    const pedidoCompleto = await db.Pedido.findByPk(nuevoPedido.id, {
      include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' },
        { model: db.PedidoDrogueria, as: 'solicitudesDrogueria' }
      ]
    });

    return res.status(201).json({
      mensaje: 'Pedido registrado correctamente.',
      pedido: pedidoCompleto
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar el pedido: ' + error.message });
  }
};

export const getPedidoById = async (req, res) => {
  try {
    const pedido = req.recurso;
    await pedido.reload({
      include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' },
        { model: db.PedidoDrogueria, as: 'solicitudesDrogueria' }
      ]
    });
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const { estado, dni, pin, urgente } = req.query;
    const where = {};

    if (estado) {
      where.estadoPedido = estado;
    }
    if (dni) {
      where.dniCliente = dni;
    }
    if (pin) {
      where.pinControl = pin;
    }
    if (urgente !== undefined) {
      where.urgente = urgente === 'true';
    }

    const pedidos = await db.Pedido.findAll({
      where,
      include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' },
        { model: db.PedidoDrogueria, as: 'solicitudesDrogueria' }
      ],
      order: [['id', 'DESC']]
    });

    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const registrarPago = async (req, res) => {
  try {
    const { pedidoId, metodoPago, comprobanteUrl } = req.body;

    if (!pedidoId || !metodoPago) {
      return res.status(400).json({ error: 'pedidoId y metodoPago son obligatorios.' });
    }

    const pedido = await db.Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    const esEfectivo = metodoPago === 'efectivo';

    const nuevoPago = await db.Pago.create({
      pedidoId,
      metodoPago,
      estadoPago: esEfectivo ? 'validado' : 'pendiente',
      comprobanteUrl: esEfectivo ? null : comprobanteUrl,
      fechaValidacion: esEfectivo ? new Date() : null
    });

    if (esEfectivo && pedido.estadoPedido === 'pendiente_pago') {
      await pedido.update({ estadoPedido: 'ingresado' });
    }

    return res.status(201).json({
      mensaje: esEfectivo ? 'Pago en efectivo registrado y validado.' : 'Comprobante recibido. Pendiente de validacion.',
      pago: nuevoPago
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const entregarPedido = async (req, res) => {
  try {
    const pedido = req.recurso;
    const { pinIngresado } = req.body;

    if (!pinIngresado) {
      return res.status(400).json({ error: 'Debe ingresar el PIN de control para retirar.' });
    }

    if (pedido.estadoPedido !== 'listo_retiro') {
      return res.status(400).json({
        error: 'El preparado no se encuentra listo para retiro. Estado actual: ' + pedido.estadoPedido
      });
    }

    if (pedido.pinControl !== String(pinIngresado).trim()) {
      return res.status(400).json({ error: 'PIN de control incorrecto. No coincide con el talonario del cliente.' });
    }

    await pedido.update({ estadoPedido: 'entregado' });

    return res.status(200).json({
      mensaje: 'Producto entregado con exito. Ciclo del preparado cerrado.',
      pedido
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const cambiarUrgenciaPedido = async (req, res) => {
  try {
    const pedido = req.recurso;
    const { urgente } = req.body;

    if (urgente === undefined) {
      return res.status(400).json({ error: 'Debe especificar el valor booleano urgente.' });
    }

    const esUrgente = urgente === true || urgente === 'true';
    let diaHoraRetiro = pedido.diaHoraRetiro;

    if (esUrgente) {
      diaHoraRetiro = new Date();
    } else {
      const principioActivo = await db.PrincipioActivo.findByPk(pedido.principioActivoId);
      const gramosRequeridos = calcularGramosRequeridos(pedido.dosis, pedido.csp);
      const tieneStock = principioActivo ? Number(principioActivo.stockDisponible || 0) >= gramosRequeridos : false;
      const horas = tieneStock ? 24 : 48;
      const fechaBase = new Date(pedido.createdAt || Date.now());
      diaHoraRetiro = new Date(fechaBase.getTime() + horas * 60 * 60 * 1000);
    }

    await pedido.update({
      urgente: esUrgente,
      diaHoraRetiro
    });

    return res.status(200).json({
      mensaje: esUrgente ? 'Pedido marcado como urgencia medica.' : 'Urgencia removida del pedido.',
      pedido
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const actualizarEstadoPedido = async (req, res) => {
  try {
    const pedido = req.recurso;
    const { estadoPedido } = req.body;

    const estadosPermitidos = [
      'ingresado',
      'pendiente_pago',
      'en_preparacion',
      'listo_retiro',
      'entregado',
      'cancelado'
    ];

    if (!estadoPedido || !estadosPermitidos.includes(estadoPedido)) {
      return res.status(400).json({
        error: 'Estado de pedido no valido. Valores permitidos: ' + estadosPermitidos.join(', ')
      });
    }

    if (estadoPedido === 'en_preparacion') {
      let pa = null;
      if (pedido.principioActivoId) {
        pa = await db.PrincipioActivo.findByPk(pedido.principioActivoId);
      }
      if (!pa && pedido.principioActivoTexto) {
        const nombreTexto = pedido.principioActivoTexto
          .replace(/(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/gi, '')
          .trim();
        pa = await db.PrincipioActivo.findOne({
          where: {
            nombre: { [Op.like]: `%${nombreTexto}%` }
          }
        });
        if (!pa) {
          pa = await db.PrincipioActivo.create({
            nombre: nombreTexto,
            stockDisponible: 0.00
          });
        }
        await pedido.update({ principioActivoId: pa.id });
      }

      const gramosRequeridos = calcularGramosRequeridos(pedido.dosis, pedido.csp);
      const stockActual = pa ? Number(pa.stockDisponible || 0) : 0;

      if (!pa || stockActual < gramosRequeridos) {
        const nombreDroga = pa ? pa.nombre : (pedido.principioActivoTexto || 'Droga Magistral');
        return res.status(400).json({
          error: `No se puede iniciar la preparacion. Falta stock de ${nombreDroga}. Se requieren ${gramosRequeridos} g para este preparado y el stock disponible es de ${stockActual} g. Se requiere reposicion de drogueria.`,
          faltaStock: true,
          principioActivo: pa,
          gramosRequeridos,
          stockActual
        });
      }

      if (pa && pedido.estadoPedido !== 'en_preparacion') {
        const nuevoStock = Math.max(0, Number((stockActual - gramosRequeridos).toFixed(2)));
        await pa.update({ stockDisponible: nuevoStock });
      }
    }

    await pedido.update({ estadoPedido });

    const pedidoActualizado = await db.Pedido.findByPk(pedido.id, {
      include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' },
        { model: db.PedidoDrogueria, as: 'solicitudesDrogueria' }
      ]
    });

    return res.status(200).json({
      mensaje: 'Estado del pedido actualizado a ' + estadoPedido,
      pedido: pedidoActualizado
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const finalizarPreparado = async (req, res) => {
  try {
    const pedido = req.recurso;
    const { numeroPreparado } = req.body;

    if (!numeroPreparado || String(numeroPreparado).trim() === '') {
      return res.status(400).json({
        error: 'El numero de preparado fisico del libro recetario es obligatorio para finalizar.'
      });
    }

    if (pedido.principioActivoId) {
      const pa = await db.PrincipioActivo.findByPk(pedido.principioActivoId);
      const gramosRequeridos = calcularGramosRequeridos(pedido.dosis, pedido.csp);
      if (pa && Number(pa.stockDisponible || 0) < 0) {
        return res.status(400).json({
          error: `No se puede finalizar la orden. Falta stock de ${pa.nombre}. La materia prima no fue recibida de drogueria.`,
          faltaStock: true,
          principioActivo: pa
        });
      }
    }

    await pedido.update({
      numeroPreparado: String(numeroPreparado).trim(),
      estadoPedido: 'listo_retiro'
    });

    return res.status(200).json({
      mensaje: 'Preparado finalizado y listo para retiro.',
      pedido
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const solicitarDrogueria = async (req, res) => {
  try {
    const pedido = req.recurso;
    let pa = null;
    if (pedido.principioActivoId) {
      pa = await db.PrincipioActivo.findByPk(pedido.principioActivoId);
    }
    if (!pa && pedido.principioActivoTexto) {
      const nombreTexto = pedido.principioActivoTexto
        .replace(/(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/gi, '')
        .trim();
      pa = await db.PrincipioActivo.findOne({
        where: {
          nombre: { [Op.like]: `%${nombreTexto}%` }
        }
      });
      if (!pa) {
        pa = await db.PrincipioActivo.create({
          nombre: nombreTexto,
          stockDisponible: 0.00
        });
      }
      await pedido.update({ principioActivoId: pa.id });
    }

    if (!pa) {
      return res.status(400).json({ error: 'El pedido no tiene un principio activo registrado.' });
    }

    const gramosRequeridos = calcularGramosRequeridos(pedido.dosis, pedido.csp);

    let solicitud = await db.PedidoDrogueria.findOne({
      where: {
        pedidoId: pedido.id,
        principioActivoId: pa.id
      }
    });

    if (!solicitud) {
      solicitud = await db.PedidoDrogueria.create({
        pedidoId: pedido.id,
        principioActivoId: pa.id,
        cantidadSolicitada: `Envase materia prima x 100 g (Requerido: ${gramosRequeridos} g)`,
        estadoSolicitud: 'pendiente',
        respuestaApi: JSON.stringify({
          origen: 'solicitud_manual_laboratorio',
          pedidoId: pedido.id,
          principioActivo: pa.nombre,
          gramosRequeridos,
          fecha: new Date().toISOString()
        })
      });
    }

    return res.status(200).json({
      mensaje: `Solicitud de ${pa.nombre} enviada a drogueria con exito.`,
      solicitud
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  createPedido,
  getPedidoById,
  getPedidos,
  registrarPago,
  entregarPedido,
  cambiarUrgenciaPedido,
  actualizarEstadoPedido,
  finalPreparado: finalizarPreparado,
  finalizarPreparado,
  solicitarDrogueria
};
