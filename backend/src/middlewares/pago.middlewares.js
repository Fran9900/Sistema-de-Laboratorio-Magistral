import validarById from "./validarByIdGenerico.middleware";
import db  from "../config/db";

export const validarPagoById = validarById(db.Pago)


