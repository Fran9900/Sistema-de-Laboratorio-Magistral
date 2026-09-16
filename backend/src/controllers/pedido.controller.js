import db from "../../../database/models";
import { generarPinUnico } from "../services/pinService";

const createPedido = async(req,res) =>{
    try{
        const data = req.body
        const tieneStock = req.tieneStock
        const principioActivo = req.principioActivo
        const fechaBase = new Date();
        let diaHoraRetiro
        if (urgente) {
        diaHoraRetiro = fechaBase
        } else {
        const horas = tieneStock ? 24 : 48
        diaHoraRetiro = new Date(fechaBase.getTime() + horas * 60 * 60 * 1000)
        }
        const pinControl = generarPinUnico()
        const nuevoPedido = await db.Pedido.create({
            recetaId,
            principioActivoId,
            nombreCliente,
            telefonoCliente,
            origenPedido,
            precio,
            dosis,
            csp,
            urgente: urgente ?? false,
            pinControl,
            diaHoraRetiro,
            estadoPedido: origenPedido === 'email' ? 'pendiente_pago' : 'ingresado'
        })
        if (!tieneStock) {
      try {
        const resDrogueria = await solicitarInsumo({
          pedidoId: nuevoPedido.id,
          principioActivoId: principioActivo.id,
          cantidad: csp || '1 unidad'
        });

        await db.PedidoDrogueria.create({
          pedidoId: nuevoPedido.id,
          principioActivoId: principioActivo.id,
          cantidadSolicitada: csp || '1 unidad',
          estadoSolicitud: resDrogueria.exito ? 'enviado_api' : 'fallido',
          respuestaApi: JSON.stringify(resDrogueria)
        });
      } catch (errDrogueria) {
        console.error('Error al conectar con la droguería:', errDrogueria.message);
        }
      }
      res.status(201).json({mensaje: "Pedido registrado correctamente", pedido: nuevoPedido})
    } catch(e){
        res.status(500).json({ error: 'Error al registrar el pedido: ' + e.message })
    }
}
const getPedidoById = async(req,res) => {
    try{
        const id = req.params.id
        const pedido = await db.Pedido.findByPk(id,{
            include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' }
      ]
        })
        res.status(200).json(pedido)
    }catch(e){
        res.status(500).json({error: e.message})
    }
}
const getPedidos = async(req,res) => {
    try{
        const pedidos = await db.Pedido.findAll({
            include: [
        { model: db.Receta, as: 'receta' },
        { model: db.PrincipioActivo, as: 'principioActivo' },
        { model: db.Pago, as: 'pago' }
      ]
        })
        res.status(200).json(pedidos)
    } catch(e){
        res.status(500).json({ error: e.message })
    }
}
const registrarPago = async (req, res) => {
  try {
    const { pedidoId, metodoPago, comprobanteUrl } = req.body

    const pedido = await db.Pedido.findByPk(pedidoId)

    const esEfectivo = metodoPago === 'efectivo'

    const nuevoPago = await db.Pago.create({
      pedidoId,
      metodoPago,
      estadoPago: esEfectivo ? 'validado' : 'pendiente',
      comprobanteUrl: esEfectivo ? null : comprobanteUrl,
      fechaValidacion: esEfectivo ? new Date() : null
    })

    if (esEfectivo) {
      await pedido.update({ estadoPedido: 'en_preparacion' })
    }

     res.status(201).json({
      mensaje: esEfectivo ? 'Pago presencial registrado y validado.' : 'Comprobante recibido, pendiente de revisión.',
      pago: nuevoPago
    })
  } catch (e) {
     res.status(500).json({ error: e.message })
  }
}
const entregarPedido = async (req, res) => {
  try {
    const  id  = req.params.id
    const { pinIngresado } = req.body

    const pedido = await db.Pedido.findByPk(id)
    
    if (pedido.pinControl !== pinIngresado) {
      return res.status(400).json({ error: 'PIN de control incorrecto. No se puede entregar el producto.' })
    }
    await pedido.update({ estadoPedido: 'entregado' })
    res.status(200).json({
      mensaje: 'Producto entregado con éxito.',
      pedido
    })
  } catch (e) {
     res.status(500).json({ e: error.message });
  }
}
module.exports = {createPedido,getPedidoById, getPedidos,registrarPago,entregarPedido}