import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "../../database/models/index.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    modulo: 'backend-base',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, async(err) => {
  if(err){
     console.error(err.message)
     process.exit(1)
  }
  await db.sequelize.sync({ alter:true }) 
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
