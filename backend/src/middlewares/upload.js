import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadDirectorio = path.resolve(__dirname, '../../uploads/recetas');

if (!fs.existsSync(uploadDirectorio)) {
  fs.mkdirSync(uploadDirectorio, { recursive: true });
}

export const TIPOS_PERMITIDOS = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf'
];

export function validarTipoMime(mimeType) {
  return TIPOS_PERMITIDOS.includes(mimeType);
}

export function generarNombreArchivo(nombreOriginal = '') {
  const extension = path.extname(nombreOriginal).toLowerCase();
  const timestamp = Date.now();
  const aleatorio = crypto.randomBytes(6).toString('hex');
  return `receta-${timestamp}-${aleatorio}${extension}`;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectorio);
  },
  filename: (req, file, cb) => {
    cb(null, generarNombreArchivo(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (validarTipoMime(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imagenes (JPEG, PNG, WEBP) o PDF.'), false);
  }
};

export const uploadReceta = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

export default uploadReceta;
