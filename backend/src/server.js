import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import recetaRoutes from './routes/receta.routes.js';
import pedidoRoutes from './routes/pedido.routes.js';
import pagoRoutes from './routes/pago.routes.js';
import principioActivoRoutes from './routes/principioActivo.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api/recetas', recetaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/principiosActivos', principioActivoRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(`Backend http://localhost:${PORT}`);
    try {
      await db.sequelize.authenticate();
      await db.sequelize.sync({ alter: true });
      console.log('Conexion con MySQL establecida.');
    } catch (dbError) {
      console.warn(`MySQL offline (127.0.0.1:3306). El servidor continuara en ejecucion. Detalle: ${dbError.message}`);
    }
  });
}

export default app;
