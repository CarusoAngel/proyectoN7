import express from "express";
import {
  crearOrden,
  crearOrdenInvitado,
  obtenerMisOrdenes,
  obtenerTodasLasOrdenes
} from "../controllers/order.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// Crear una nueva orden autenticada
router.post("/", auth, crearOrden);

// Crear una nueva orden como invitado
router.post("/invitado", crearOrdenInvitado);

// Obtener historial de órdenes del usuario autenticado
router.get("/mis-ordenes", auth, obtenerMisOrdenes);

// Obtener todas las órdenes (solo para usuarios admin)
router.get("/todas", auth, obtenerTodasLasOrdenes);

export default router;