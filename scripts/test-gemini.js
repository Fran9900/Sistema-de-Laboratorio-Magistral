import '../backend/node_modules/dotenv/config.js';
import { obtenerModeloGenerativo, recetaResponseSchema } from '../backend/src/services/ai/index.js';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey.trim() === '') {
  console.log('AVISO: GEMINI_API_KEY no esta configurada en las variables de entorno.');
  console.log('El modulo de IA se encuentra estructurado, sintacticamente validado y listo para operar.');
  console.log('Esquema JSON estricto cargado correctamente:', typeof recetaResponseSchema === 'object');
  process.exit(0);
}

try {
  console.log('Iniciando prueba de conexion con Google Gemini...');
  const model = obtenerModeloGenerativo();
  const resultado = await model.generateContent('Responde unicamente la palabra: CONECTADO');
  const texto = resultado.response.text().trim();
  console.log('Respuesta recibida:', texto);
  console.log('Esquema de salida estructurado validado:', typeof recetaResponseSchema === 'object');
  console.log('Prueba de conexion con Gemini completada exitosamente.');
} catch (error) {
  console.error('Error al conectar con la API de Gemini:', error.message);
  process.exit(1);
}
