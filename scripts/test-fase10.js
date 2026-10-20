import fs from 'fs';
import path from 'path';
import assert from 'assert';

const basePath = process.cwd();
const talonarioPath = path.join(basePath, 'frontend/src/components/recepcion/TalonarioModal.jsx');
const appPath = path.join(basePath, 'frontend/src/App.jsx');

console.log('Iniciando verificacion de Fase 10 (TalonarioModal)...');

assert(fs.existsSync(talonarioPath), 'El archivo TalonarioModal.jsx no existe.');
console.log('OK: TalonarioModal.jsx existe en frontend/src/components/recepcion/.');

const talonarioContent = fs.readFileSync(talonarioPath, 'utf8');

assert(!talonarioContent.includes('//') && !talonarioContent.includes('/*'), 'TalonarioModal.jsx contiene comentarios prohibidos.');
console.log('OK: TalonarioModal.jsx no contiene comentarios.');

assert(talonarioContent.includes('text-5xl font-mono font-extrabold'), 'TalonarioModal debe exhibir el PIN en tamano destacado.');
console.log('OK: Tipografia destacada de 4 digitos para PIN de retiro.');

assert(talonarioContent.includes('window.print()'), 'TalonarioModal debe contar con boton de impresion.');
console.log('OK: Metodo de impresion de talonario configurado.');

assert(talonarioContent.includes('role="dialog"') && talonarioContent.includes('aria-modal="true"'), 'TalonarioModal debe incorporar semantica de accesibilidad modal.');
console.log('OK: Accesibilidad WAI-ARIA verificada.');

const appContent = fs.readFileSync(appPath, 'utf8');
assert(!appContent.includes('//') && !appContent.includes('/*'), 'App.jsx contiene comentarios prohibidos.');
assert(appContent.includes("import TalonarioModal from './components/recepcion/TalonarioModal.jsx'"), 'App.jsx debe importar TalonarioModal.');
assert(appContent.includes('<TalonarioModal'), 'App.jsx debe renderizar TalonarioModal.');
console.log('OK: Integracion de TalonarioModal en App.jsx verificada.');

console.log('Todas las pruebas de Fase 10 pasaron exitosamente.');
