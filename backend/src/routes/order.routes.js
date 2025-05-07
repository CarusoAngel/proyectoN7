import express from "express";
import { crearOrden } from "../controllers/order.controller.js";
import auth from "../middlewares/auth.middleware.js";
import Order from "../models/order.model.js";

const router = express.Router();

// Crear una nueva orden
router.post("/", auth, crearOrden);

// Obtener historial de órdenes del usuario autenticado
router.get("/mis-ordenes", auth, async (req, res) => {
  try {
    const ordenes = await Order.find({ usuario: req.user.id })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.json(ordenes);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes" });
  }
});

// Obtener todas las órdenes (solo para usuarios admin)
router.get("/todas", auth, async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado: solo para administradores" });
    }

    const ordenes = await Order.find()
      .populate("usuario", "nombre correo")
      .sort({ createdAt: -1 });

    res.json(ordenes);
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes del sistema" });
  }
});

export default router;