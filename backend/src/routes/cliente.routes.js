import { Router } from 'express';
import { validarPedidoById } from '../middlewares/pedido.middleware.js';
import {
  buscarPedidosCliente,
  actualizarContactoCliente,
  crearReclamo,
  listarReclamosPedido
} from '../controllers/cliente.controller.js';

const router = Router();

router.get('/buscar', buscarPedidosCliente);
router.patch('/pedidos/:id/contacto', validarPedidoById, actualizarContactoCliente);
router.post('/pedidos/:id/reclamos', validarPedidoById, crearReclamo);
router.get('/pedidos/:id/reclamos', validarPedidoById, listarReclamosPedido);

export default router;
