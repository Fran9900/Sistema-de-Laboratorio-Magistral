import { Router } from "express";
import { validarPrincipioActivoById, validarCantidad } from "../middlewares/principioActivo.middleware.js";
import { actualizarStock, registrarPrincipioActivo, getPrincipioActivoById, getPrincipiosActivos } from "../controllers/principioActivo.controller.js";

const router = Router()

router.get("/", getPrincipiosActivos)
router.get("/:id", validarPrincipioActivoById, getPrincipioActivoById)

router.post("/", registrarPrincipioActivo)
router.put("/:id", [validarPrincipioActivoById, validarCantidad], actualizarStock)

export default router