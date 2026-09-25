import { Router } from "express";
import { validarPagoById } from "../middlewares/pago.middleware.js";
import {
  cambiarEstadoPago,
  getPagoPorPedido,
  getPagos,
} from "../controllers/pago.controller.js";
import { validarPedidoById } from "../middlewares/pedido.middleware.js";

const router = Router();

router.put("/:id", validarPagoById, cambiarEstadoPago);
router.get(":/pedidos/:id", validarPedidoById, getPagoPorPedido);
router.get("/", getPagos);

export default router;
