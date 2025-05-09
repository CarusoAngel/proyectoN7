import express from "express";
import {
  crearOrden,
  crearOrdenInvitado,
  confirmarOrdenExitosa,
  obtenerMisOrdenes,
  obtenerTodasLasOrdenes
} from "../controllers/order.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// Orden con autenticación
router.post("/", auth, crearOrden);

// Orden como invitado (pública)
router.post("/invitado", crearOrdenInvitado);

// Confirmación de orden tras pago aprobado
router.post("/confirmar", confirmarOrdenExitosa);

// Historial usuario autenticado
router.get("/mis-ordenes", auth, obtenerMisOrdenes);

// Todas las órdenes (solo admin)
router.get("/todas", auth, obtenerTodasLasOrdenes);

export default router;