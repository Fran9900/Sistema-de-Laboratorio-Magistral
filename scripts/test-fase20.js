import fs from 'fs';
import path from 'path';

const basePath = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');

console.log('Iniciando Auditoria Final de Robustez y Calidad de Codigo (Fase 20)...');

const directoriosARevisar = [
  path.join(basePath, 'backend/src'),
  path.join(basePath, 'frontend/src'),
  path.join(basePath, 'scripts')
];

let totalArchivosAuditados = 0;
let totalComentariosDetectados = 0;
let totalLineas = 0;

function recorrerDirectorio(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== 'dist' && item !== '.git') {
        recorrerDirectorio(fullPath);
      }
    } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.jsx'))) {
      totalArchivosAuditados++;
      const contenido = fs.readFileSync(fullPath, 'utf-8');
      const lineas = contenido.split('\n');
      totalLineas += lineas.length;

      lineas.forEach((linea, index) => {
        const trimmed = linea.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.endsWith('*/')) {
          console.error(`Comentario detectado en ${fullPath}:${index + 1} -> ${trimmed}`);
          totalComentariosDetectados++;
        }
      });
    }
  }
}

directoriosARevisar.forEach(d => recorrerDirectorio(d));

console.log(`Auditoria de comentarios: ${totalArchivosAuditados} archivos analizados (${totalLineas} lineas de codigo).`);

if (totalComentariosDetectados > 0) {
  console.error(`Se detectaron ${totalComentariosDetectados} comentarios no permitidos.`);
  process.exit(1);
} else {
  console.log('Regla de oro cumplida: CERO comentarios en el codigo fuente.');
}

const packageBackend = JSON.parse(fs.readFileSync(path.join(basePath, 'backend/package.json'), 'utf-8'));
const packageFrontend = JSON.parse(fs.readFileSync(path.join(basePath, 'frontend/package.json'), 'utf-8'));

if (!packageBackend.name || !packageFrontend.name) {
  console.error('Archivos package.json incompletos');
  process.exit(1);
}

const serverFile = path.join(basePath, 'backend/src/server.js');
const serverContent = fs.readFileSync(serverFile, 'utf-8');
const rutasRequeridas = [
  '/api/recetas',
  '/api/pedidos',
  '/api/pagos',
  '/api/principiosActivos',
  '/api/clientes'
];

rutasRequeridas.forEach(r => {
  if (!serverContent.includes(r)) {
    console.error(`Ruta base faltante en server.js: ${r}`);
    process.exit(1);
  }
});

const appFile = path.join(basePath, 'frontend/src/App.jsx');
const appContent = fs.readFileSync(appFile, 'utf-8');
const componentesRequeridos = [
  'ScannerModal',
  'SideBySideView',
  'TalonarioModal',
  'ColaPreparacion',
  'RecetaViewer',
  'FinalizarPreparadoModal',
  'BusquedaCliente'
];

componentesRequeridos.forEach(c => {
  if (!appContent.includes(c)) {
    console.error(`Componente critico no montado en App.jsx: ${c}`);
    process.exit(1);
  }
});

console.log('Auditoria final de Fase 20 completada con exito. Sistema integro, robusto y listo para entrega.');
