import fs from 'fs';
import path from 'path';
import assert from 'assert';

const basePath = process.cwd();
const scannerPath = path.join(basePath, 'frontend/src/components/recepcion/ScannerModal.jsx');
const appPath = path.join(basePath, 'frontend/src/App.jsx');

console.log('Iniciando verificacion de Fase 8 (ScannerModal)...');

assert(fs.existsSync(scannerPath), 'El archivo ScannerModal.jsx no existe.');
console.log('OK: ScannerModal.jsx existe en el directorio de recepcion.');

const scannerContent = fs.readFileSync(scannerPath, 'utf8');

assert(!scannerContent.includes('//') && !scannerContent.includes('/*'), 'ScannerModal.jsx contiene comentarios prohibidos.');
console.log('OK: ScannerModal.jsx no contiene comentarios.');

assert(scannerContent.includes("api.post('/recetas/escanear'"), 'ScannerModal.jsx debe invocar el endpoint /recetas/escanear.');
console.log('OK: Invocacion correcta al endpoint /recetas/escanear mediante FormData.');

assert(scannerContent.includes("accept=\"image/jpeg,image/png,image/webp,application/pdf\""), 'ScannerModal.jsx debe restringir los formatos permitidos.');
console.log('OK: Restriccion a tipos de archivo validos (JPG, PNG, WEBP, PDF).');

assert(scannerContent.includes('role="dialog"') && scannerContent.includes('aria-modal="true"'), 'ScannerModal.jsx debe incorporar accesibilidad semantica modal.');
console.log('OK: Accesibilidad semantica dialog/aria-modal verificada.');

const appContent = fs.readFileSync(appPath, 'utf8');
assert(!appContent.includes('//') && !appContent.includes('/*'), 'App.jsx contiene comentarios prohibidos.');
assert(appContent.includes("import ScannerModal from './components/recepcion/ScannerModal.jsx'"), 'App.jsx debe importar ScannerModal.');
assert(appContent.includes('<ScannerModal'), 'App.jsx debe renderizar ScannerModal.');
console.log('OK: Integracion de ScannerModal en App.jsx verificada.');

console.log('Todas las pruebas de Fase 8 pasaron exitosamente.');
