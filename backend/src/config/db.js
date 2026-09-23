import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../../database/models/index.js');
const db = require(dbPath);

export const {
  sequelize,
  Sequelize,
  ConfiguracionSistema,
  PrincipioActivo,
  Receta,
  Pedido,
  Pago,
  PedidoDrogueria,
  Reclamo
} = db;

export default db;
