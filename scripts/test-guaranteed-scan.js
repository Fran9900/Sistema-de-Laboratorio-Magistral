import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'backend/src/services/ai/aiService.js'),
  path.join(basePath, 'backend/src/controllers/receta.controller.js')
];

let errores = 0;

archivosAExaminar.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.error(`Falta el archivo: ${filePath}`);
    errores++;
    return;
  }

  const contenido = fs.readFileSync(filePath, 'utf-8');

  const lineas = contenido.split('\n');
  lineas.forEach((linea, index) => {
    const trimmed = linea.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.endsWith('*/')) {
      console.error(`Comentario detectado en ${filePath}:${index + 1} -> ${trimmed}`);
      errores++;
    }
  });
});

const aiService = fs.readFileSync(path.join(basePath, 'backend/src/services/ai/aiService.js'), 'utf-8');
if (aiService.includes('extraerDatosMockReceta')) {
  console.error('aiService todavia contiene motor mock o fallback local que el usuario pidio borrar');
  errores++;
}

if (!aiService.includes('gemini-3.1-flash-lite') && !aiService.includes('gemini-3.6-flash')) {
  console.error('aiService no incluye los modelos reales activos');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de IA pura sin mocks y cero comentarios exitosa.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
