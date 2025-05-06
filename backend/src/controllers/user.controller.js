import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

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

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/usuarios/${req.file.filename}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
        id: user._id,
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

// Login con JWT y respuesta estructurada

export const loginUser = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const userFound = await User.findOne({ correo }).select("+password");
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

// Verificación de token y retorno completo del usuario

export const verifyToken = async (req, res) => {
  try {
    const { id } = req.user;

    const userFound = await User.findById(id).select('nombre correo imagen');

    if (!userFound) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Token válido',
      user: {
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        imagen: userFound.imagen
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al verificar token',
      detail: error.message
    });
  }
};
