import Order from "../models/order.model.js";

export const crearOrden = async (req, res) => {
  try {
    const { nombre, direccion, productos, total } = req.body;

    if (!nombre || !direccion || !productos || productos.length === 0) {
      return res.status(400).json({ message: "Datos incompletos para la orden" });
    }

    const nuevaOrden = new Order({
      usuario: req.user.id, 
      nombre,
      direccion,
      productos,
      total,
    });

    const ordenGuardada = await nuevaOrden.save();

    res.status(201).json({ message: "Orden creada con éxito", orden: ordenGuardada });
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({ message: "Error del servidor al crear la orden" });
  }
};
