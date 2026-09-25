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
  entregarPedido
} from '../controllers/pedido.controller.js';

const router = Router();

router.post('/', [validarReceta, verificarStockPrincipioActivo], createPedido);
router.post('/pago', registrarPago);
router.post('/:id/entregar', validarPedidoById, entregarPedido);
router.get('/', getPedidos);
router.get('/:id', validarPedidoById, getPedidoById);

export default router;
