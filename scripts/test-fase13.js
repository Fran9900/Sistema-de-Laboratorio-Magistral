import fs from 'fs';
import path from 'path';
import assert from 'assert';

const basePath = 'C:\\Users\\ituka\\Documents\\Honey\\workspace\\Javascript\\Sistema de Laboratorio Magistral';
const colaPath = path.join(basePath, 'frontend/src/components/laboratorio/ColaPreparacion.jsx');
const appPath = path.join(basePath, 'frontend/src/App.jsx');
const controllerPath = path.join(basePath, 'backend/src/controllers/pedido.controller.js');
const routesPath = path.join(basePath, 'backend/src/routes/pedido.routes.js');

console.log('Iniciando verificacion de Fase 13 (Cola de Preparacion)...');

assert(fs.existsSync(colaPath), 'ColaPreparacion.jsx no existe.');
assert(fs.existsSync(appPath), 'App.jsx no existe.');
assert(fs.existsSync(controllerPath), 'pedido.controller.js no existe.');
assert(fs.existsSync(routesPath), 'pedido.routes.js no existe.');

const colaContent = fs.readFileSync(colaPath, 'utf8');
assert(!colaContent.includes('//') && !colaContent.includes('/*'), 'ColaPreparacion.jsx contiene comentarios prohibidos.');
console.log('OK: ColaPreparacion.jsx no contiene comentarios.');

assert(colaContent.includes("api.get('/pedidos')"), 'ColaPreparacion debe consultar /pedidos.');
assert(colaContent.includes("api.patch(`/pedidos/${pedidoId}/estado`"), 'ColaPreparacion debe poder actualizar estado del pedido a en_preparacion.');
assert(colaContent.includes('URGENTE'), 'ColaPreparacion debe destacar con badge las recetas urgentes.');
assert(colaContent.includes('pedidosFiltrados'), 'ColaPreparacion debe contar con filtrado dinamico.');
console.log('OK: Funcionalidades de cola, filtros y ordenamiento de urgencia verificadas.');

const appContent = fs.readFileSync(appPath, 'utf8');
assert(!appContent.includes('//') && !appContent.includes('/*'), 'App.jsx contiene comentarios prohibidos.');
assert(appContent.includes("import ColaPreparacion from './components/laboratorio/ColaPreparacion.jsx'"), 'App.jsx debe importar ColaPreparacion.');
assert(appContent.includes('<ColaPreparacion'), 'App.jsx debe renderizar ColaPreparacion en la pestana de laboratorio.');
console.log('OK: Integracion en App.jsx verificada.');

const controllerContent = fs.readFileSync(controllerPath, 'utf8');
assert(!controllerContent.includes('//') && !controllerContent.includes('/*'), 'pedido.controller.js contiene comentarios prohibidos.');
assert(controllerContent.includes('actualizarEstadoPedido'), 'pedido.controller.js debe exportar actualizarEstadoPedido.');
console.log('OK: Controlador actualizarEstadoPedido en backend verificado.');

const routesContent = fs.readFileSync(routesPath, 'utf8');
assert(!routesContent.includes('//') && !routesContent.includes('/*'), 'pedido.routes.js contiene comentarios prohibidos.');
assert(routesContent.includes("router.patch('/:id/estado'"), 'pedido.routes.js debe registrar la ruta PATCH /:id/estado.');
console.log('OK: Ruta PATCH /:id/estado verificada.');

console.log('Todas las pruebas de Fase 13 pasaron exitosamente.');
