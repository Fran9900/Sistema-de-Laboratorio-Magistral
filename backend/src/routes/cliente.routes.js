import { Router } from 'express';
import { validarPedidoById } from '../middlewares/pedido.middleware.js';
import {
  buscarPedidosCliente,
  actualizarContactoCliente,
  crearReclamo,
  listarReclamosPedido
} from '../controllers/cliente.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de búsquedas de pedidos, actualización de contacto y reclamos de clientes
 */

/**
 * @swagger
 * /clientes/pedidos:
 *   get:
 *     summary: Buscar pedidos del cliente por DNI o PIN de control
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: termino
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del cliente o PIN de control del pedido para realizar la búsqueda
 *         example: "42100200"
 *     responses:
 *       200:
 *         description: Lista de pedidos encontrados con sus asociaciones (receta, principioActivo, pago, reclamos)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   dniCliente:
 *                     type: string
 *                   pinControl:
 *                     type: string
 *                   nombreCliente:
 *                     type: string
 *                   telefonoCliente:
 *                     type: string
 *                   receta:
 *                     type: object
 *                   principioActivo:
 *                     type: object
 *                   pago:
 *                     type: object
 *                   reclamos:
 *                     type: array
 *                     items:
 *                       type: object
 *       400:
 *         description: Debe ingresar un DNI o PIN de control para realizar la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Debe ingresar un DNI o PIN de control para realizar la busqueda."
 *       500:
 *         description: Error al buscar pedidos del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al buscar pedidos del cliente: mensaje de error"
 */
router.get('/buscar', buscarPedidosCliente);

/**
 * @swagger
 * /clientes/pedidos/{id}/contacto:
 *   put:
 *     summary: Actualizar datos de contacto del cliente en un pedido
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del pedido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telefonoCliente
 *             properties:
 *               telefonoCliente:
 *                 type: string
 *                 description: Nuevo número de teléfono (obligatorio)
 *                 example: "11-4567-8901"
 *               nombreCliente:
 *                 type: string
 *                 description: Nombre del cliente (opcional)
 *                 example: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Datos de contacto actualizados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Datos de contacto actualizados correctamente."
 *                 pedido:
 *                   type: object
 *       400:
 *         description: El número de teléfono no puede quedar vacío
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El numero de telefono no puede quedar vacio."
 *       404:
 *         description: Pedido no encontrado mediante middleware de validación
 *       500:
 *         description: Error al actualizar contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar contacto: mensaje de error"
 */
router.patch('/pedidos/:id/contacto', validarPedidoById, actualizarContactoCliente);

/**
 * @swagger
 * /clientes/pedidos/{id}/reclamos:
 *   post:
 *     summary: Crear y asentar un nuevo reclamo asociado a un pedido
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del pedido sobre el cual se asienta el reclamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - motivo
 *             properties:
 *               motivo:
 *                 type: string
 *                 description: Motivo obligatorio del reclamo
 *                 example: "Demora en el tiempo de entrega"
 *               descripcion:
 *                 type: string
 *                 description: Detalle o descripción adicional del reclamo
 *                 example: "El plazo acordado era 24h y pasaron 48h sin notificación."
 *     responses:
 *       201:
 *         description: Reclamo asentado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Reclamo asentado exitosamente."
 *                 reclamo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     pedidoId:
 *                       type: integer
 *                     motivo:
 *                       type: string
 *                     descripcion:
 *                       type: string
 *                     estado:
 *                       type: string
 *                       example: "abierto"
 *       400:
 *         description: El motivo del reclamo es obligatorio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El motivo del reclamo es obligatorio."
 *       404:
 *         description: Pedido no encontrado mediante middleware de validación
 *       500:
 *         description: Error al asentar reclamo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al asentar reclamo: mensaje de error"
 */
router.post('/pedidos/:id/reclamos', validarPedidoById, crearReclamo);

/**
 * @swagger
 * /clientes/pedidos/{id}/reclamos:
 *   get:
 *     summary: Listar todos los reclamos asociados a un pedido
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del pedido para consultar reclamos
 *     responses:
 *       200:
 *         description: Lista de reclamos del pedido ordenados descendentemente por fecha de creación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   pedidoId:
 *                     type: integer
 *                   motivo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *                     example: "abierto"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Pedido no encontrado mediante middleware de validación
 *       500:
 *         description: Error al obtener reclamos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener reclamos: mensaje de error"
 */
router.get('/pedidos/:id/reclamos', validarPedidoById, listarReclamosPedido);

export default router;
