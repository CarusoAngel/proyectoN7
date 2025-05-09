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

// Confirmar orden exitosa después de pago aprobado
export const confirmarOrdenExitosa = async (req, res) => {
  try {
    const { status, payment_id, preference_id, creadaDesde } = req.body;

    if (status !== "approved") {
      return res.status(400).json({ message: "El pago no fue aprobado. Orden no creada." });
    }

    const nuevaOrden = new Order({
      nombre: "Pago confirmado",
      direccion: "Confirmación automática",
      productos: [],
      total: 0,
      usuario: null,
      creadaComo: creadaDesde || "auto_return",
      payment_id,
      preference_id
    });

    await nuevaOrden.save();

    res.status(201).json({ ok: true, message: "Orden registrada tras aprobación de pago." });
  } catch (error) {
    console.error("Error al confirmar orden:", error.message, error.stack);
    res.status(500).json({ message: "Error al registrar la orden luego del pago" });
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