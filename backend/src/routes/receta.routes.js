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

/**
 * @swagger
 * tags:
 *   name: Recetas
 *   description: Gestión y auditoría legal de prescripciones médicas
 */

/**
 * @swagger
 * /recetas:
 *   get:
 *     summary: Obtener el historial completo de recetas
 *     tags: [Recetas]
 *     responses:
 *       200:
 *         description: Lista de recetas registradas recuperada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   codigoBarras:
 *                     type: string
 *                     example: "7791234567890"
 *                   matriculaMedico:
 *                     type: string
 *                     example: "MP-45892"
 *                   imagenUrl:
 *                     type: string
 *                     example: "/uploads/recetas/receta-1.png"
 *                   esDigital:
 *                     type: boolean
 *                     example: true
 *                   fechaEmision:
 *                     type: string
 *                     format: date
 *                     example: "2026-10-15"
 *                   esValida:
 *                     type: boolean
 *                     example: true
 *                   motivoRechazo:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *       500:
 *         description: Error interno del servidor al recuperar el historial
 */
router.get('/', getRecetas);

/**
 * @swagger
 * /recetas:
 *   post:
 *     summary: Registrar una nueva receta (Válida o Rechazada por RN-01)
 *     tags: [Recetas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoBarras:
 *                 type: string
 *               matriculaMedico:
 *                 type: string
 *               imagenUrl:
 *                 type: string
 *               esDigital:
 *                 type: boolean
 *               fechaEmision:
 *                 type: string
 *                 format: date
 *               esValida:
 *                 type: boolean
 *               motivoRechazo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Objeto creado conteniendo la propiedad receta
 *       500:
 *         description: Error al crear la receta
 */
router.post('/', createReceta);

/**
 * @swagger
 * /recetas/{id}:
 *   get:
 *     summary: Obtener el detalle de una receta específica por su ID
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico único de la receta
 *     responses:
 *       200:
 *         description: Registro de receta recuperado exitosamente
 *       404:
 *         description: El registro con la clave primaria especificada no fue encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', validarRecetaById, getRecetaById);

router.post('/escanear', uploadReceta.single('receta'), procesarYValidarReceta);

export default router;
