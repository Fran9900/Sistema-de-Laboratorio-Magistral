import { Op } from 'sequelize';
import db from '../config/db.js';
import validarById from './validarByIdGenerico.middleware.js';
import { calcularGramosRequeridos } from '../utils/calculoFarmaceutico.js';

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
    let { principioActivoId, principioActivoTexto, dosis, csp } = req.body;
    const gramosRequeridos = calcularGramosRequeridos(dosis, csp);
    req.gramosRequeridos = gramosRequeridos;

    if (!principioActivoId) {
      if (principioActivoTexto && String(principioActivoTexto).trim() !== '') {
        const nombreTexto = String(principioActivoTexto)
          .replace(/(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/gi, '')
          .trim();
        let pa = await db.PrincipioActivo.findOne({
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
        req.principioActivo = pa;
        req.body.principioActivoId = pa.id;
        req.tieneStock = Number(pa.stockDisponible || 0) >= gramosRequeridos;
        return next();
      }
      return res.status(400).json({ error: 'El campo principioActivoId o principioActivoTexto es obligatorio.' });
    }

    const principioActivo = await db.PrincipioActivo.findByPk(principioActivoId);

    if (!principioActivo) {
      return res.status(404).json({ error: 'El principio activo especificado no existe.' });
    }

    req.principioActivo = principioActivo;
    req.tieneStock = Number(principioActivo.stockDisponible || 0) >= gramosRequeridos;

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
