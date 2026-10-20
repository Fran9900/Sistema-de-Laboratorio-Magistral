import fs from 'fs';
import path from 'path';
import assert from 'assert';

const basePath = process.cwd();
const controllerPath = path.join(basePath, 'backend/src/controllers/pedido.controller.js');
const routesPath = path.join(basePath, 'backend/src/routes/pedido.routes.js');
const sideBySidePath = path.join(basePath, 'frontend/src/components/recepcion/SideBySideView.jsx');
const talonarioPath = path.join(basePath, 'frontend/src/components/recepcion/TalonarioModal.jsx');

console.log('Iniciando verificacion de Fase 11 (Gestion de Urgencias Medicas)...');

assert(fs.existsSync(controllerPath), 'pedido.controller.js no existe.');
assert(fs.existsSync(routesPath), 'pedido.routes.js no existe.');
assert(fs.existsSync(sideBySidePath), 'SideBySideView.jsx no existe.');
assert(fs.existsSync(talonarioPath), 'TalonarioModal.jsx no existe.');

const controllerContent = fs.readFileSync(controllerPath, 'utf8');
assert(!controllerContent.includes('//') && !controllerContent.includes('/*'), 'pedido.controller.js contiene comentarios prohibidos.');
assert(controllerContent.includes('cambiarUrgenciaPedido'), 'pedido.controller.js debe contener la funcion cambiarUrgenciaPedido.');
assert(controllerContent.includes('if (esUrgente) {') && controllerContent.includes('diaHoraRetiro = fechaBase') && controllerContent.includes('diaHoraRetiro = new Date()'), 'pedido.controller.js debe forzar diaHoraRetiro inmediato al marcar urgente.');
console.log('OK: Logica backend de urgencia inmediata en pedido.controller.js verificada.');

const routesContent = fs.readFileSync(routesPath, 'utf8');
assert(!routesContent.includes('//') && !routesContent.includes('/*'), 'pedido.routes.js contiene comentarios prohibidos.');
assert(routesContent.includes("router.patch('/:id/urgencia'"), 'pedido.routes.js debe exponer PATCH /:id/urgencia.');
console.log('OK: Endpoint PATCH /:id/urgencia verificado en rutas.');

const sideContent = fs.readFileSync(sideBySidePath, 'utf8');
assert(!sideContent.includes('//') && !sideContent.includes('/*'), 'SideBySideView.jsx contiene comentarios prohibidos.');
assert(sideContent.includes('name="urgente"'), 'SideBySideView.jsx debe incluir checkbox o toggle para marcar urgencia medica.');
assert(sideContent.includes('Inmediata / Mismo dia (Urgente)'), 'SideBySideView.jsx debe reflejar plazo inmediato ante urgencias.');
console.log('OK: Control visual y calculo inmediato en SideBySideView.jsx verificado.');

const talonarioContent = fs.readFileSync(talonarioPath, 'utf8');
assert(!talonarioContent.includes('//') && !talonarioContent.includes('/*'), 'TalonarioModal.jsx contiene comentarios prohibidos.');
assert(talonarioContent.includes("pedido.urgente ? 'Urgencia Medica' : 'Plazo Estandar'"), 'TalonarioModal.jsx debe destacar la condicion de urgencia en el comprobante.');
console.log('OK: Badge e identificador de Urgencia Medica en comprobante de retiro verificado.');

console.log('Todas las pruebas de Fase 11 pasaron exitosamente.');
