import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'backend/src/controllers/pedido.controller.js'),
  path.join(basePath, 'backend/src/routes/pedido.routes.js'),
  path.join(basePath, 'frontend/src/components/laboratorio/FinalizarPreparadoModal.jsx'),
  path.join(basePath, 'frontend/src/App.jsx')
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

const controllerContent = fs.readFileSync(path.join(basePath, 'backend/src/controllers/pedido.controller.js'), 'utf-8');
if (!controllerContent.includes('finalizarPreparado')) {
  console.error('El controlador no exporta o define finalizarPreparado');
  errores++;
}
if (!controllerContent.includes('listo_retiro')) {
  console.error('El controlador no actualiza el estado a listo_retiro');
  errores++;
}

const routesContent = fs.readFileSync(path.join(basePath, 'backend/src/routes/pedido.routes.js'), 'utf-8');
if (!routesContent.includes('/:id/finalizar')) {
  console.error('Las rutas no exponen PATCH /:id/finalizar');
  errores++;
}

const appContent = fs.readFileSync(path.join(basePath, 'frontend/src/App.jsx'), 'utf-8');
if (!appContent.includes('FinalizarPreparadoModal') || !appContent.includes('onFinalizarPreparado')) {
  console.error('App.jsx no integra FinalizarPreparadoModal adecuadamente');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de Fase 15 exitosa. Codigo limpio, sin comentarios y con contratos integrados.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
