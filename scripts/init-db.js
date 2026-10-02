import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseDir = path.resolve(__dirname, '../database');

try {
  try {
    execSync('npx sequelize-cli db:create', {
      cwd: databaseDir,
      stdio: 'pipe'
    });
  } catch (createError) {}

  console.log('Iniciando ejecucion de migraciones...');
  execSync('npx sequelize-cli db:migrate', {
    cwd: databaseDir,
    stdio: 'inherit'
  });

  console.log('Iniciando ejecucion de seeders...');
  execSync('npx sequelize-cli db:seed:all', {
    cwd: databaseDir,
    stdio: 'inherit'
  });

  console.log('Base de datos inicializada correctamente.');
} catch (error) {
  console.error('Error durante la inicializacion de la base de datos:', error.message);
  process.exit(1);
}
