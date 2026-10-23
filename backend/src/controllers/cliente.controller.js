import { Op } from 'sequelize';
import db from '../config/db.js';

export const buscarPedidosCliente = async (req, res) => {
  try {
    const { termino } = req.query;

    if (!termino || String(termino).trim() === '') {
      return res.status(400).json({ error: 'Debe ingresar un DNI o PIN de control para realizar la busqueda.' });
    }

    const valorLimpio = String(termino).trim();

    const pedidos = await db.Pedido.findAll({
      where: {
        [Op.or]: [
          { dniCliente: valorLimpio },
          { pinControl: valorLimpio }
        ]
      },
      include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' },
        { model: db.Reclamo, as: 'reclamos' }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ error: 'Error al buscar pedidos del cliente: ' + error.message });
  }
};

export const actualizarContactoCliente = async (req, res) => {
  try {
    const pedido = req.recurso;
    const { telefonoCliente, nombreCliente } = req.body;

    if (!telefonoCliente || String(telefonoCliente).trim() === '') {
      return res.status(400).json({ error: 'El numero de telefono no puede quedar vacio.' });
    }

    const camposAActualizar = {
      telefonoCliente: String(telefonoCliente).trim()
    };

    if (nombreCliente && String(nombreCliente).trim() !== '') {
      camposAActualizar.nombreCliente = String(nombreCliente).trim();
    }

    await pedido.update(camposAActualizar);

    return res.status(200).json({
      mensaje: 'Datos de contacto actualizados correctamente.',
      pedido
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar contacto: ' + error.message });
  }
};

export const crearReclamo = async (req, res) => {
  try {
    const pedido = req.recurso;
    const { motivo, descripcion } = req.body;

    if (!motivo || String(motivo).trim() === '') {
      return res.status(400).json({ error: 'El motivo del reclamo es obligatorio.' });
    }

    const nuevoReclamo = await db.Reclamo.create({
      pedidoId: pedido.id,
      motivo: String(motivo).trim(),
      descripcion: descripcion ? String(descripcion).trim() : '',
      estado: 'abierto'
    });

    return res.status(201).json({
      mensaje: 'Reclamo asentado exitosamente.',
      reclamo: nuevoReclamo
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al asentar reclamo: ' + error.message });
  }
};

export const listarReclamosPedido = async (req, res) => {
  try {
    const pedido = req.recurso;
    const reclamos = await db.Reclamo.findAll({
      where: { pedidoId: pedido.id },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(reclamos);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener reclamos: ' + error.message });
  }
};

export default {
  buscarPedidosCliente,
  actualizarContactoCliente,
  crearReclamo,
  listarReclamosPedido
};
