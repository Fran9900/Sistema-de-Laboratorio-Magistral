import fs from 'fs';
import { obtenerClienteGemini } from './geminiClient.js';
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

async function ejecutarConTimeout(promesa, ms = 18000) {
  let timerId;
  const promesaTimeout = new Promise((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`Timeout de ${ms}ms superado en llamada a Gemini`));
    }, ms);
  });

  try {
    const resultado = await Promise.race([promesa, promesaTimeout]);
    clearTimeout(timerId);
    return resultado;
  } catch (error) {
    clearTimeout(timerId);
    throw error;
  }
}

function parsearRespuestaJSON(texto) {
  if (!texto) {
    throw new Error('La respuesta del modelo de IA esta vacia.');
  }
  const textoLimpio = texto.replace(/```json/gi, '').replace(/```/g, '').trim();
  return JSON.parse(textoLimpio);
}

export async function extraerDatosReceta(bufferOPath, mimeType = 'image/jpeg') {
  const parteImagen = prepararParteGenerativa(bufferOPath, mimeType);
  const genAI = obtenerClienteGemini();

  const modeloPrincipal = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
  const modelosCandidatos = [
    modeloPrincipal,
    'gemini-3.1-flash-lite',
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3-flash-preview',
    'gemini-3.8-flash'
  ];
  const modelosUnicos = [...new Set(modelosCandidatos)];

  let ultimoError = null;

  for (const nombreModelo of modelosUnicos) {
    try {
      const model = genAI.getGenerativeModel({
        model: nombreModelo,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      });

      const resultado = await ejecutarConTimeout(
        model.generateContent([PROMPT_EXTRACCION_RECETA, parteImagen]),
        18000
      );

      const textoRespuesta = resultado.response.text();
      const datosParseados = parsearRespuestaJSON(textoRespuesta);
      return datosParseados;
    } catch (err) {
      ultimoError = err;
      const esErrorDemanda = err.message && (err.message.includes('503') || err.message.includes('high demand'));
      if (esErrorDemanda) {
        console.warn(`Modelo ${nombreModelo} reporto 503 high demand. Intentando siguiente modelo real.`);
      } else {
        console.warn(`Modelo ${nombreModelo} fallo: ${err.message}. Intentando siguiente modelo real.`);
      }
    }
  }

  throw new Error(`No se pudo procesar la receta con los modelos de IA disponibles: ${ultimoError ? ultimoError.message : 'Error desconocido'}`);
}

export default {
  extraerDatosReceta
};
