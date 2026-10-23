import { Router } from 'express';
import {
  validarReceta,
  verificarStockPrincipioActivo,
  validarPedidoById
} from '../middlewares/pedido.middleware.js';
import {
  createPedido,
  getPedidos,
  getPedidoById,
  registrarPago,
  entregarPedido,
  cambiarUrgenciaPedido,
  actualizarEstadoPedido,
  finalizarPreparado
} from '../controllers/pedido.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Flujo de trabajo del laboratorio y pedidos magistrales
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener el listado general de pedidos magistrales
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos con sus relaciones
 *       500:
 *         description: Error interno al recuperar pedidos
 */
router.get('/', getPedidos);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido de formulación magistral
 *     description: Evalúa stock local para asignar plazo de entrega a 24h (RN-04), 48h con pedido automático a Droguería (RN-08) o 0h si es marcado como Urgente (RN-05). Genera automáticamente el PIN de retiro.
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recetaId
 *               - principioActivoId
 *               - nombreCliente
 *               - telefonoCliente
 *               - dosis
 *               - csp
 *             properties:
 *               recetaId:
 *                 type: integer
 *                 example: 1
 *               principioActivoId:
 *                 type: integer
 *                 example: 2
 *               nombreCliente:
 *                 type: string
 *                 example: "Juan Pérez"
 *               dniCliente:
 *                 type: string
 *                 nullable: true
 *                 example: "42100200"
 *               telefonoCliente:
 *                 type: string
 *                 example: "11-4567-8901"
 *               origenPedido:
 *                 type: string
 *                 default: "mostrador"
 *                 example: "mostrador"
 *               precio:
 *                 type: number
 *                 default: 0.00
 *                 example: 4500.50
 *               dosis:
 *                 type: string
 *                 example: "50 mg"
 *               csp:
 *                 type: string
 *                 example: "60 cápsulas"
 *               urgente:
 *                 type: boolean
 *                 default: false
 *                 example: false
 *     responses:
 *       201:
 *         description: Pedido registrado exitosamente. Retorna el objeto Pedido y el PIN generado.
 *       400:
 *         description: Datos requeridos faltantes o inválidos
 *       500:
 *         description: Error en el servidor al procesar el pedido
 */
router.post('/', [validarReceta, verificarStockPrincipioActivo], createPedido);

/**
 * @swagger
 * /pago:
 *   post:
 *     summary: Registrar un cobro para un pedido
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedidoId
 *               - monto
 *               - metodoPago
 *             properties:
 *               pedidoId:
 *                 type: integer
 *                 example: 1
 *               monto:
 *                 type: number
 *                 example: 4500.00
 *               metodoPago:
 *                 type: string
 *                 enum: [efectivo, tarjeta, transferencia, qr]
 *                 example: "efectivo"
 *               observaciones:
 *                 type: string
 *                 nullable: true
 *                 example: "Pago exacto en mostrador"
 *     responses:
 *       201:
 *         description: Pago registrado y pedido actualizado a estado pagado
 *       400:
 *         description: Datos de pago inválidos
 *       500:
 *         description: Error interno al procesar el pago
 */
router.post('/pago', registrarPago);
router.post('/:id/entregar', validarPedidoById, entregarPedido);
router.patch('/:id/urgencia', validarPedidoById, cambiarUrgenciaPedido);
router.patch('/:id/estado', validarPedidoById, actualizarEstadoPedido);
router.patch('/:id/finalizar', validarPedidoById, finalizarPreparado);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido específico por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del pedido recuperados
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', validarPedidoById, getPedidoById);

export default router;
