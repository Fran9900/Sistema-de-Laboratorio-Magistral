import { Router } from 'express';
import { uploadReceta } from '../middlewares/upload.js';
import validarRecetaById from '../middlewares/receta.middleware.js';
import {
  procesarYValidarReceta,
  createReceta,
  getRecetaById,
  getRecetas
} from '../controllers/receta.controller.js';

const router = Router();

router.post('/escanear', uploadReceta.single('receta'), procesarYValidarReceta);
router.post('/', createReceta);
router.get('/:id', validarRecetaById, getRecetaById);
router.get('/', getRecetas);

export default router;
