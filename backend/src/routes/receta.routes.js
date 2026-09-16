
import {createReceta,getRecetaById,getRecetas} from "../controllers/receta.controller"
import validarRecetaById from "../middlewares/receta.middleware"
const route = Router()

route.post("/",createReceta)
route.get("/:id", validarRecetaById, getRecetaById)
route.get("/",getRecetas)

module.exports = route

