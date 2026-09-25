import db from '../config/db.js';
import validarById from './validarByIdGenerico.middleware.js';

const validarRecetaById = validarById(db.Receta);

export default validarRecetaById;