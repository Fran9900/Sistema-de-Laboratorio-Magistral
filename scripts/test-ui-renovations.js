import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'frontend/src/App.jsx'),
  path.join(basePath, 'frontend/src/components/laboratorio/ColaPreparacion.jsx')
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

const appContent = fs.readFileSync(path.join(basePath, 'frontend/src/App.jsx'), 'utf-8');

if (appContent.includes('Modulo de Recepcion y Mostrador') || appContent.includes('Modulo de Clientes y Pagos')) {
  console.error('App.jsx aun contiene los encabezados eliminados');
  errores++;
}

if (appContent.includes('Escanear o cargar fotografia de la prescripcion') || appContent.includes('Validacion automatica de vigencia') || appContent.includes('Calculo de 24 horas con stock')) {
  console.error('App.jsx aun contiene los textos descriptivos eliminados');
  errores++;
}

const colaContent = fs.readFileSync(path.join(basePath, 'frontend/src/components/laboratorio/ColaPreparacion.jsx'), 'utf-8');

if (colaContent.includes('Cola de Trabajo y Preparacion Magistral') || colaContent.includes('Urgencias Pendientes')) {
  console.error('ColaPreparacion.jsx aun contiene el banner o las cards grandes eliminadas');
  errores++;
}

if (!colaContent.includes('totalUrgentes') || !colaContent.includes('totalEnProceso') || !colaContent.includes('totalListos')) {
  console.error('ColaPreparacion.jsx no incluye los nuevos recuadros sutiles de informacion');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de renovaciones de UI exitosa. Cero comentarios y cabos sueltos eliminados.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
