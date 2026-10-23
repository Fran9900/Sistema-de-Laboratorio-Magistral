import { Router } from "express";
import { validarPagoById } from "../middlewares/pago.middleware.js";
import {
  cambiarEstadoPago,
  getPagoPorPedido,
  getPagos,
} from "../controllers/pago.controller.js";
import { validarPedidoById } from "../middlewares/pedido.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Registro de cobros y transacciones
 */

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Obtener el historial completo de pagos registrados
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Historial de transacciones recuperado con éxito
 *       500:
 *         description: Error al obtener el historial de pagos
 */
router.get("/", getPagos);


router.put("/:id", validarPagoById, cambiarEstadoPago);

/**
 * @swagger
 * /pagos/{id}:
 *   get:
 *     summary: Obtener comprobante de pago por ID
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del pago encontrado
 *       404:
 *         description: Pago no encontrado
 */
router.get(":/pedidos/:id", validarPedidoById, getPagoPorPedido);

export default router;
