import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import recetaRoutes from './routes/receta.routes.js';
import pedidoRoutes from './routes/pedido.routes.js';
import pagoRoutes from './routes/pago.routes.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    modulo: 'backend-base',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/recetas', recetaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('api/pagos', pagoRoutes)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    await db.sequelize.sync({ alter: true });
    console.log(`Backend escuchando en http://localhost:${PORT}`);
  });
}

export default app;
