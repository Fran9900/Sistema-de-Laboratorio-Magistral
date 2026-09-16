import db from "../../../database/models";
import validarById from "./validarByIdGenerico.middleware";

const validarReceta = async(req,res,next) => {
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
        error: 'No se puede procesar el pedido con una receta inválida.',
        motivo: receta.motivoRechazo 
      });
    }
    req.recetaValida = receta;
    next()
} catch(e){
    res.status(500).json({ error: 'Error al verificar la receta: ' + e.message })
    }
}

const verificarStockPrincipioActivo = async(req,res,next) => {
    try{
        const { principioActivoId } = req.body;

    if (!principioActivoId) {
      return res.status(400).json({ error: 'El campo principioActivoId es obligatorio.' });
    }

    const principioActivo = await db.PrincipioActivo.findByPk(principioActivoId);

    if (!principioActivo) {
      return res.status(404).json({ error: 'El principio activo especificado no existe.' });
    }

    req.principioActivo = principioActivo;
    req.tieneStock = principioActivo.stockDisponible > 0;

    next()
    } catch(e){
        res.status(500).json({ error: 'Error al verificar el stock: ' + e.message })
    }
}
const validarPedidoById = validarById(db.Pedido)
module.exports = {verificarStockPrincipioActivo,validarReceta,validarPedidoById}