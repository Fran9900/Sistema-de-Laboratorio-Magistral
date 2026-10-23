import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'frontend/src/services/api.js'),
  path.join(basePath, 'frontend/src/components/recepcion/ScannerModal.jsx')
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

const apiContent = fs.readFileSync(path.join(basePath, 'frontend/src/services/api.js'), 'utf-8');
if (apiContent.includes('timeout: 15000')) {
  console.error('api.js todavia tiene el timeout de 15 segundos');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de timeout ampliado exitosa. Cero comentarios.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
