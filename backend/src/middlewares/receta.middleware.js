import db from "../../../database/models";
import validarById from "./validarByIdGenerico.middleware";

const validarRecetaById = validarById(db.Receta)

module.exports = validarRecetaById