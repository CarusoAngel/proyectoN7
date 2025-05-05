import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio debe ser mayor o igual a 0']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  categoria: {
    type: String,
    enum: {
      values: ['powdercoating', 'cerakote', 'carbonfiber', 'sandblasting'],
      message: '{VALUE} no es una categoría válida'
    },
    required: [true, 'La categoría es obligatoria']
  },
  imagen: {
    type: String,
    required: [true, 'La imagen del producto es obligatoria']
  }
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
