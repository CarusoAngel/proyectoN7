import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    productos: [
      {
        _id: false, // evitamos subdocumentos innecesarios
        productoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        nombre: String,
        cantidad: Number,
        precio: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
