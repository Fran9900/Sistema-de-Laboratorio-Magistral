import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

export function obtenerClienteGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no esta configurada en las variables de entorno.');
  }
  return new GoogleGenerativeAI(apiKey);
}

export function obtenerModeloGenerativo(opciones = {}) {
  const genAI = obtenerClienteGemini();
  const nombreModelo = opciones.model || process.env.GEMINI_MODEL || 'gemini-3.6-flash';
  return genAI.getGenerativeModel({
    model: nombreModelo,
    ...opciones
  });
}

export default {
  obtenerClienteGemini,
  obtenerModeloGenerativo
};
