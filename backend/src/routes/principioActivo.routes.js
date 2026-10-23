import { Router } from "express";
import { validarPrincipioActivoById, validarCantidad } from "../middlewares/principioActivo.middleware.js";
import { actualizarStock, registrarPrincipioActivo, getPrincipioActivoById, getPrincipiosActivos } from "../controllers/principioActivo.controller.js";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Principios Activos
 *   description: Catálogo e inventario de materias primas para formulación
 */

/**
 * @swagger
 * /principiosactivos:
 *   get:
 *     summary: Obtener el catálogo completo de principios activos y su stock
 *     tags: [Principios Activos]
 *     responses:
 *       200:
 *         description: Lista de principios activos recuperada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getPrincipiosActivos)

/**
 * @swagger
 * /principiosactivos/{id}:
 *   get:
 *     summary: Obtener información detallada de una droga por su ID
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del principio activo recuperados
 *       404:
 *         description: El registro con id no fue encontrado
 */
router.get("/:id", validarPrincipioActivoById, getPrincipioActivoById)

/**
 * @swagger
 * /principiosactivos:
 *   post:
 *     summary: Registrar un nuevo principio activo
 *     tags: [Principios Activos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre obligatorio del principio activo
 *                 example: "Ibuprofeno"
 *               stockDisponible:
 *                 type: number
 *                 description: Cantidad inicial de stock
 *                 example: 500
 *     responses:
 *       201:
 *         description: Principio activo registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Principio activo registrado correctamente"
 *                 principioActivo:
 *                   type: object
 *       400:
 *         description: Error de validación cuando falta el nombre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El nombre es obligatorio"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", registrarPrincipioActivo)

/**
 * @swagger
 * /principiosactivos/{id}:
 *   put:
 *     summary: Actualizar el stock disponible de un principio activo
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cantidad
 *             properties:
 *               cantidad:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Stock actualizado correctamente
 *       400:
 *         description: La cantidad debe ser un número válido mayor o igual a 0
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error al actualizar el stock
 */
router.put("/:id", [validarPrincipioActivoById, validarCantidad], actualizarStock)

export default router