import validarById from "./validarByIdGenerico.middleware.js";
import db  from "../config/db.js";

export const validarPagoById = validarById(db.Pago)


