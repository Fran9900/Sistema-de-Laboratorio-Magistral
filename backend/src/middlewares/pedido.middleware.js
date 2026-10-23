import db from '../config/db.js';
import validarById from './validarByIdGenerico.middleware.js';

export const validarReceta = async (req, res, next) => {
  try {
    const { recetaId } = req.body;

    if (!recetaId) {
      return res.status(400).json({ error: 'El campo recetaId es obligatorio.' });
    }

    const receta = await db.Receta.findByPk(recetaId);

    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada.' });
    }

    if (!receta.esValida) {
      return res.status(400).json({
        error: 'No se puede procesar el pedido con una receta invalida.',
        motivo: receta.motivoRechazo
      });
    }

    req.recetaValida = receta;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error al verificar la receta: ' + error.message });
  }
};

export const verificarStockPrincipioActivo = async (req, res, next) => {
  try {
    const { principioActivoId, principioActivoTexto } = req.body;

    if (!principioActivoId) {
      if (principioActivoTexto && String(principioActivoTexto).trim() !== '') {
        req.principioActivo = null;
        req.tieneStock = false;
        return next();
      }
      return res.status(400).json({ error: 'El campo principioActivoId o principioActivoTexto es obligatorio.' });
    }

    const principioActivo = await db.PrincipioActivo.findByPk(principioActivoId);

    if (!principioActivo) {
      return res.status(404).json({ error: 'El principio activo especificado no existe.' });
    }

    req.principioActivo = principioActivo;
    req.tieneStock = Number(principioActivo.stockDisponible || 0) > 0;

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error al verificar el stock: ' + error.message });
  }
};

export const validarPedidoById = validarById(db.Pedido);

export default {
  validarReceta,
  verificarStockPrincipioActivo,
  validarPedidoById
};