import { Router } from "express";
import { validarPagoById } from "../middlewares/pago.middlewares";
import {
  cambiarEstadoPago,
  getPagoPorPedido,
  getPagos,
} from "../controllers/pago.controller";
import { validarPedidoById } from "../middlewares/pedido.middleware";

const router = Router();

router.put("/:id", validarPagoById, cambiarEstadoPago);
router.get(":/pedidos/:id", validarPedidoById, getPagoPorPedido);
router.get("/", getPagos);

export default router;
