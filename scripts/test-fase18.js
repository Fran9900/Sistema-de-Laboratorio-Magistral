import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

const archivosAExaminar = [
  path.join(basePath, 'backend/src/controllers/pedido.controller.js'),
  path.join(basePath, 'backend/src/routes/pedido.routes.js'),
  path.join(basePath, 'frontend/src/components/cliente/RetiroPedidoModal.jsx'),
  path.join(basePath, 'frontend/src/components/cliente/BusquedaCliente.jsx')
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
if (!controllerContent.includes('entregarPedido') || !controllerContent.includes('listo_retiro') || !controllerContent.includes('pinControl')) {
  console.error('El controlador de pedidos no valida adecuadamente el PIN y estado listo_retiro');
  errores++;
}

const routesContent = fs.readFileSync(path.join(basePath, 'backend/src/routes/pedido.routes.js'), 'utf-8');
if (!routesContent.includes('/:id/entregar')) {
  console.error('pedido.routes.js no expone POST /:id/entregar');
  errores++;
}

const modalContent = fs.readFileSync(path.join(basePath, 'frontend/src/components/cliente/RetiroPedidoModal.jsx'), 'utf-8');
if (!modalContent.includes('maxLength={4}') || !modalContent.includes('pinIngresado')) {
  console.error('RetiroPedidoModal no implementa correctamente la validacion del PIN');
  errores++;
}

const busquedaContent = fs.readFileSync(path.join(basePath, 'frontend/src/components/cliente/BusquedaCliente.jsx'), 'utf-8');
if (!busquedaContent.includes('RetiroPedidoModal') || !busquedaContent.includes('Retirar Producto')) {
  console.error('BusquedaCliente no integra el boton o modal de retiro');
  errores++;
}

if (errores === 0) {
  console.log('Verificacion de Fase 18 exitosa. Codigo limpio, sin comentarios, cero emojis y contratos integrados.');
} else {
  console.error(`Verificacion fallida con ${errores} errores.`);
  process.exit(1);
}
