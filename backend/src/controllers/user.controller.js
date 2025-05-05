import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { uploadPhoto } from '../config/multer.config.js';

// Registro de usuario con imagen y contraseña encriptada
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

    // Enlace a la imagen subida
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/usuarios/${req.file.filename}`;

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const user = new User({
      nombre,
      apellido,
      correo,
      telefono,
      fechaNacimiento,
      password: hashedPassword,
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
    res.status(500).json({
      error: 'Error al registrar usuario',
      detail: error.message
    });
  }
};

// Login de usuario con validación y JWT
export const loginUser = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const userFound = await User.findOne({ correo });
    if (!userFound) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordOk = await bcrypt.compare(password, userFound.password);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: userFound._id, correo: userFound.correo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        imagen: userFound.imagen
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error en el servidor',
      detail: error.message
    });
  }
};

// ✅ Verificación de token para mostrar perfil protegido
export const verifyToken = async (req, res) => {
  try {
    const { id } = req.user; // `req.user` viene del middleware de autenticación
    const userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      user: {
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        imagen: userFound.imagen
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error en el servidor',
      detail: error.message
    });
  }
};
