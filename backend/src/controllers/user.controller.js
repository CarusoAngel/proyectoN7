import { User } from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      correo,
      telefono,
      fechaNacimiento,
      password
    } = req.body;

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/usuarios/${req.file.filename}`;

    const user = new User({
      nombre,
      apellido,
      correo,
      telefono,
      fechaNacimiento,
      password,
      imagen: imageUrl
    });

    await user.save();

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        nombre: user.nombre,
        correo: user.correo,
        imagen: user.imagen
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detail: error.message });
  }
};
