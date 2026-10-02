import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Iniciando verificacion de Fase 7: Frontend Base, Estilos y Navegacion...');

const apiPath = path.join(rootDir, 'frontend/src/services/api.js');
assert.ok(fs.existsSync(apiPath), 'El archivo frontend/src/services/api.js debe existir');
const apiContent = fs.readFileSync(apiPath, 'utf8');
assert.ok(apiContent.includes("baseURL: '/api'"), 'api.js debe configurar baseURL en /api');

const navbarPath = path.join(rootDir, 'frontend/src/components/common/Navbar.jsx');
assert.ok(fs.existsSync(navbarPath), 'El archivo frontend/src/components/common/Navbar.jsx debe existir');
const navbarContent = fs.readFileSync(navbarPath, 'utf8');
assert.ok(navbarContent.includes('export default function Navbar'), 'Navbar.jsx debe exportar la funcion Navbar');
assert.ok(navbarContent.includes('recepcion'), 'Navbar.jsx debe incluir la pestana recepcion');
assert.ok(navbarContent.includes('clientes'), 'Navbar.jsx debe incluir la pestana clientes');
assert.ok(navbarContent.includes('laboratorio'), 'Navbar.jsx debe incluir la pestana laboratorio');

const appPath = path.join(rootDir, 'frontend/src/App.jsx');
assert.ok(fs.existsSync(appPath), 'El archivo frontend/src/App.jsx debe existir');
const appContent = fs.readFileSync(appPath, 'utf8');
assert.ok(appContent.includes('export default function App'), 'App.jsx debe exportar la funcion App');
assert.ok(appContent.includes('useState'), 'App.jsx debe manejar estado');
assert.ok(appContent.includes('Navbar'), 'App.jsx debe renderizar el componente Navbar');

const vitePath = path.join(rootDir, 'frontend/vite.config.js');
assert.ok(fs.existsSync(vitePath), 'El archivo frontend/vite.config.js debe existir');
const viteContent = fs.readFileSync(vitePath, 'utf8');
assert.ok(viteContent.includes("'/api'"), 'vite.config.js debe configurar proxy para /api');
assert.ok(viteContent.includes("'/uploads'"), 'vite.config.js debe configurar proxy para /uploads');

const scanComments = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanComments(fullPath);
    } else if (entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
          assert.fail(`Comentario detectado en ${fullPath}:${idx + 1}`);
        }
      });
    }
  }
};

scanComments(path.join(rootDir, 'frontend/src'));
console.log('Verificacion de ausencia total de comentarios en codigo aprobada.');

console.log('Verificacion de Fase 7 completada con exito.');
process.exit(0);
