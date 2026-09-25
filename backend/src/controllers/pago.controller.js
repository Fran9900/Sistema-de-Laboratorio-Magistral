export const cambiarEstadoPago = async (req, res) => {
  try {
    const { estadoPago } = req.body; 

    if (!['validado', 'rechazado'].includes(estadoPago)) {
      return res.status(400).json({ error: 'Estado de pago no válido. Debe ser "validado" o "rechazado".' });
    }

    const pago = req.recurso;

    await pago.update({
      estadoPago,
      fechaValidacion: estadoPago === 'validado' ? new Date() : null
    });

    if (estadoPago === 'validado') {
      const pedido = await db.Pedido.findByPk(pago.pedidoId);
      if (pedido) {
        await pedido.update({ estadoPedido: 'en_preparacion' });
      }
    }

    return res.status(200).json({
      mensaje: `El pago ha sido actualizado a: ${estadoPago}`,
      pago
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el pago: ' + error.message });
  }
};

export const getPagoPorPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const pago = await db.Pago.findOne({
      where: { pedidoId },
      include: [{ model: db.Pedido, as: 'pedido' }]
    });

    if (!pago) {
      return res.status(404).json({ error: 'No se encontró ningún pago asociado a este pedido.' });
    }

    return res.status(200).json(pago);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPagos = async (req, res) => {
  try {
    const pagos = await db.Pago.findAll({
      where: donde,
      include: [{ model: db.Pedido, as: 'pedido' }],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(pagos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};