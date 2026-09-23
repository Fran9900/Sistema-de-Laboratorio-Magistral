import fs from 'fs';
import { obtenerModeloGenerativo } from './geminiClient.js';
import { recetaResponseSchema } from './responseSchema.js';
import { PROMPT_EXTRACCION_RECETA } from './prompts.js';

function prepararParteGenerativa(bufferOPath, mimeType = 'image/jpeg') {
  let base64Data;
  if (Buffer.isBuffer(bufferOPath)) {
    base64Data = bufferOPath.toString('base64');
  } else if (typeof bufferOPath === 'string') {
    base64Data = fs.readFileSync(bufferOPath).toString('base64');
  } else {
    throw new Error('El archivo proporcionado debe ser un Buffer o una ruta valida.');
  }

  return {
    inlineData: {
      data: base64Data,
      mimeType
    }
  };
}

export async function extraerDatosReceta(bufferOPath, mimeType = 'image/jpeg') {
  const parteImagen = prepararParteGenerativa(bufferOPath, mimeType);

  const model = obtenerModeloGenerativo({
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: recetaResponseSchema,
      temperature: 0.1
    }
  });

  const resultado = await model.generateContent([
    PROMPT_EXTRACCION_RECETA,
    parteImagen
  ]);

  const textoRespuesta = resultado.response.text();
  return JSON.parse(textoRespuesta);
}

export default {
  extraerDatosReceta
};
