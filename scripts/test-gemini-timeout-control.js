import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'backend/src/services/ai/aiService.js'),
  path.join(basePath, 'backend/src/services/ai/geminiClient.js')
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
if (!aiService.includes('ejecutarConTimeout')) {
  console.error('aiService no incluye la funcion de timeout');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de timeout y resiliencia exitosa. Cero comentarios.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
