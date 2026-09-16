import {Router} from 'express';
import {validarReceta,verificarStockPrincipioActivo,validarPedidoById} from "../middlewares/pedido.middleware"
import {createPedido,getPedidos,getPedidoById,registrarPago,entregarPedido} from "../controllers/pedido.controller"
const route = Router()

route.post("/", [validarReceta,verificarStockPrincipioActivo], createPedido)
route.post('/pago', registrarPago);
route.post('/:id/entregar', validarPedidoById, entregarPedido);
route.get('/', getPedidos)
route.get('/:id', validarPedidoById, getPedidoById)

module.exports = route
