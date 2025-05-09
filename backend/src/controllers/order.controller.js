import Order from "../models/order.model.js";
import "../models/User.js";

// Crear orden con autenticación
export const crearOrden = async (req, res) => {
  try {
    const { nombre, direccion, productos, total } = req.body;

    if (!nombre || !direccion || !productos || productos.length === 0) {
      return res.status(400).json({ message: "Datos incompletos para la orden" });
    }

    const ordenData = {
      nombre,
      direccion,
      productos,
      total,
      usuario: req.user?.id || null,
      creadaComo: req.user ? "usuario" : "invitado"
    };

    const nuevaOrden = new Order(ordenData);
    const ordenGuardada = await nuevaOrden.save();

    res.status(201).json({
      message: "Orden creada con éxito",
      orden: ordenGuardada,
    });
  } catch (error) {
    console.error("Error al crear orden:", error.message, error.stack);
    res.status(500).json({ message: "Error del servidor al crear la orden" });
  }
};

// Crear orden como invitado (sin JWT)
export const crearOrdenInvitado = async (req, res) => {
  try {
    const { nombre, direccion, productos, total } = req.body;

    if (!nombre || !direccion || !productos || productos.length === 0) {
      return res.status(400).json({ message: "Datos incompletos para la orden" });
    }

    const ordenData = {
      nombre,
      direccion,
      productos,
      total,
      usuario: null,
      creadaComo: "invitado"
    };

    const nuevaOrden = new Order(ordenData);
    const ordenGuardada = await nuevaOrden.save();

    res.status(201).json({
      message: "Orden de invitado creada con éxito",
      orden: ordenGuardada,
    });
  } catch (error) {
    console.error("Error al crear orden de invitado:", error.message, error.stack);
    res.status(500).json({ message: "Error al crear orden de invitado" });
  }
};

// Obtener historial del usuario autenticado
export const obtenerMisOrdenes = async (req, res) => {
  try {
    const ordenes = await Order.find({ usuario: req.user.id })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json(ordenes);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error.message, error.stack);
    res.status(500).json({ message: "Error al obtener tus órdenes" });
  }
};

// Obtener todas las órdenes (admin)
export const obtenerTodasLasOrdenes = async (req, res) => {
  try {
    if (!req.user || req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado: solo administradores" });
    }

    const ordenes = await Order.find()
      .sort({ createdAt: -1 })
      .populate("usuario", "nombre correo");

    res.status(200).json(ordenes);
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error.message, error.stack);
    res.status(500).json({ message: "Error al obtener las órdenes del sistema" });
  }
};