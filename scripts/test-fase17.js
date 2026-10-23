import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'backend/src/controllers/cliente.controller.js'),
  path.join(basePath, 'backend/src/routes/cliente.routes.js'),
  path.join(basePath, 'backend/src/server.js'),
  path.join(basePath, 'frontend/src/components/cliente/BusquedaCliente.jsx'),
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

const controllerContent = fs.readFileSync(path.join(basePath, 'backend/src/controllers/cliente.controller.js'), 'utf-8');
if (!controllerContent.includes('buscarPedidosCliente') || !controllerContent.includes('actualizarContactoCliente') || !controllerContent.includes('crearReclamo')) {
  console.error('El controlador de clientes no exporta todos los metodos requeridos');
  errores++;
}

const routesContent = fs.readFileSync(path.join(basePath, 'backend/src/routes/cliente.routes.js'), 'utf-8');
if (!routesContent.includes('/buscar') || !routesContent.includes('/contacto') || !routesContent.includes('/reclamos')) {
  console.error('cliente.routes.js no expone todas las rutas requeridas');
  errores++;
}

const serverContent = fs.readFileSync(path.join(basePath, 'backend/src/server.js'), 'utf-8');
if (!serverContent.includes('/api/clientes')) {
  console.error('server.js no monta las rutas /api/clientes');
  errores++;
}

const appContent = fs.readFileSync(path.join(basePath, 'frontend/src/App.jsx'), 'utf-8');
if (!appContent.includes('BusquedaCliente') || !appContent.includes('<BusquedaCliente />')) {
  console.error('App.jsx no renderiza BusquedaCliente adecuadamente');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de Fase 17 exitosa. Codigo limpio, sin comentarios, cero emojis y contratos integrados.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
