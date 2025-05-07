import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    imagen: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["cliente", "admin"],
      default: "cliente",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model('User', userSchema);