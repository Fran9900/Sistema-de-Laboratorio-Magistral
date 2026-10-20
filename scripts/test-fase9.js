import fs from 'fs';
import path from 'path';
import assert from 'assert';

const basePath = process.cwd();
const sideBySidePath = path.join(basePath, 'frontend/src/components/recepcion/SideBySideView.jsx');
const appPath = path.join(basePath, 'frontend/src/App.jsx');

console.log('Iniciando verificacion de Fase 9 (SideBySideView)...');

assert(fs.existsSync(sideBySidePath), 'El archivo SideBySideView.jsx no existe.');
console.log('OK: SideBySideView.jsx existe en frontend/src/components/recepcion/.');

const sideContent = fs.readFileSync(sideBySidePath, 'utf8');

assert(!sideContent.includes('//') && !sideContent.includes('/*'), 'SideBySideView.jsx contiene comentarios prohibidos.');
console.log('OK: SideBySideView.jsx no contiene comentarios.');

assert(sideContent.includes("api.get('/principiosActivos')"), 'SideBySideView debe consultar catalogo de drogas.');
console.log('OK: Consulta dinamica al catalogo de drogas en el backend.');

assert(sideContent.includes("api.post('/recetas'"), 'SideBySideView debe persistir la receta validada.');
assert(sideContent.includes("api.post('/pedidos'"), 'SideBySideView debe persistir el pedido asociado.');
console.log('OK: Flujo de persistencia de receta y pedido verificado.');

assert(sideContent.includes('grid grid-cols-2') || sideContent.includes('grid-cols-2'), 'SideBySideView debe tener estructura de pantalla dividida.');
console.log('OK: Estructura de pantalla dividida (side-by-side) verificada.');

const appContent = fs.readFileSync(appPath, 'utf8');
assert(!appContent.includes('//') && !appContent.includes('/*'), 'App.jsx contiene comentarios prohibidos.');
assert(appContent.includes("import SideBySideView from './components/recepcion/SideBySideView.jsx'"), 'App.jsx debe importar SideBySideView.');
assert(appContent.includes('<SideBySideView'), 'App.jsx debe renderizar SideBySideView condicionalmente.');
console.log('OK: Integracion condicional de SideBySideView en App.jsx verificada.');

console.log('Todas las pruebas de Fase 9 pasaron exitosamente.');
