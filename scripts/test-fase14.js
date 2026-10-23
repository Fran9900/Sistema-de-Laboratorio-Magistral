import fs from 'fs';
import path from 'path';
import assert from 'assert';

const basePath = 'C:\\Users\\ituka\\Documents\\Honey\\workspace\\Javascript\\Sistema de Laboratorio Magistral';
const viewerPath = path.join(basePath, 'frontend/src/components/laboratorio/RecetaViewer.jsx');
const appPath = path.join(basePath, 'frontend/src/App.jsx');
const colaPath = path.join(basePath, 'frontend/src/components/laboratorio/ColaPreparacion.jsx');

console.log('Iniciando verificacion de Fase 14 (Visor de Receta Original)...');

assert(fs.existsSync(viewerPath), 'RecetaViewer.jsx no existe.');
assert(fs.existsSync(appPath), 'App.jsx no existe.');
assert(fs.existsSync(colaPath), 'ColaPreparacion.jsx no existe.');

const viewerContent = fs.readFileSync(viewerPath, 'utf8');
assert(!viewerContent.includes('//') && !viewerContent.includes('/*'), 'RecetaViewer.jsx contiene comentarios prohibidos.');
console.log('OK: RecetaViewer.jsx no contiene comentarios.');

assert(viewerContent.includes('handleZoomIn') && viewerContent.includes('handleZoomOut'), 'RecetaViewer debe soportar zoom in/out.');
assert(viewerContent.includes('handleRotate'), 'RecetaViewer debe soportar rotacion de la imagen.');
assert(viewerContent.includes('role="dialog"') && viewerContent.includes('aria-modal="true"'), 'RecetaViewer debe implementar accesibilidad modal.');
assert(viewerContent.includes('esPdf'), 'RecetaViewer debe contemplar archivos PDF con enlace de apertura.');
console.log('OK: Funcionalidades de zoom, rotacion y soporte PDF verificadas.');

const appContent = fs.readFileSync(appPath, 'utf8');
assert(!appContent.includes('//') && !appContent.includes('/*'), 'App.jsx contiene comentarios prohibidos.');
assert(appContent.includes("import RecetaViewer from './components/laboratorio/RecetaViewer.jsx'"), 'App.jsx debe importar RecetaViewer.');
assert(appContent.includes('<RecetaViewer'), 'App.jsx debe renderizar RecetaViewer.');
assert(appContent.includes('onVerReceta={handleVerReceta}'), 'App.jsx debe pasar callback onVerReceta a ColaPreparacion.');
console.log('OK: Integracion en App.jsx verificada.');

const colaContent = fs.readFileSync(colaPath, 'utf8');
assert(colaContent.includes('onVerReceta(pedido.receta, pedido)'), 'ColaPreparacion debe invocar onVerReceta al hacer clic en el boton de visualizacion.');
console.log('OK: Disparo de visor desde ColaPreparacion verificado.');

console.log('Todas las pruebas de Fase 14 pasaron exitosamente.');
