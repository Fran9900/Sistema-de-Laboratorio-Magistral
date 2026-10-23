import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'backend/src/services/ai/geminiClient.js'),
  path.join(basePath, 'backend/src/services/ai/aiService.js')
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

const aiServiceContent = fs.readFileSync(path.join(basePath, 'backend/src/services/ai/aiService.js'), 'utf-8');
if (!aiServiceContent.includes('gemini-3.8-flash')) {
  console.error('aiService no incluye gemini-3.8-flash');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de gemini-3.8-flash exitosa. Cero comentarios en codigo.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
