import validarById from "./validarByIdGenerico.middleware.js";
import db from "../config/db.js";

export const validarPrincipioActivoById = validarById(db.PrincipioActivo)

export const validarCantidad = async (req, res, next) => {
    try {
        const { cantidad } = req.body
        if (cantidad === undefined || isNaN(cantidad) || cantidad < 0) {
        return res.status(400).json({ error: 'Debe ingresar una cantidad válida igual o mayor a 0.' });
        }
    } catch (error) {
        res.status(500).json({message: "error al validar la cantidad"})
    }
    next()
}