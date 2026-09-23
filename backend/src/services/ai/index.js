import { obtenerClienteGemini, obtenerModeloGenerativo } from './geminiClient.js';
import { recetaResponseSchema } from './responseSchema.js';
import { PROMPT_EXTRACCION_RECETA } from './prompts.js';
import { extraerDatosReceta } from './aiService.js';

export {
  obtenerClienteGemini,
  obtenerModeloGenerativo,
  recetaResponseSchema,
  PROMPT_EXTRACCION_RECETA,
  extraerDatosReceta
};

export default {
  obtenerClienteGemini,
  obtenerModeloGenerativo,
  recetaResponseSchema,
  PROMPT_EXTRACCION_RECETA,
  extraerDatosReceta
};
