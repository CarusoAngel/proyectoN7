import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Registro de usuario con imagen opcional (Cloudinary o sin imagen)
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

    if (!nombre || !apellido || !correo || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const userExist = await User.findOne({ correo });
    if (userExist) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    let imageUrl = null;
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      nombre,
      apellido,
      correo,
      telefono,
      fechaNacimiento,
      password: hashedPassword,
      imagen: imageUrl,
      rol: "cliente"
    });

    await user.save();

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        imagen: user.imagen,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error("Error en registerUser:", error.message);
    res.status(500).json({
      error: 'Error al registrar usuario',
      detail: error.message
    });
  }
};

// Login con JWT
export const loginUser = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const userFound = await User.findOne({ correo }).select("nombre correo imagen rol +password");

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
        imagen: userFound.imagen,
        rol: userFound.rol
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error en el servidor',
      detail: error.message
    });
  }
};

// Verificación de token
export const verifyToken = async (req, res) => {
  try {
    const { id } = req.user;

    const userFound = await User.findById(id).select('nombre correo imagen rol');

    if (!userFound) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Token válido',
      user: {
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        imagen: userFound.imagen,
        rol: userFound.rol
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al verificar token',
      detail: error.message
    });
  }
};

// Actualización de usuario (con imagen incluida)
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const datosActualizados = req.body && typeof req.body === 'object' ? { ...req.body } : {};

    if (req.file && req.file.path) {
      datosActualizados.imagen = req.file.path;
    }

    delete datosActualizados.rol;
    delete datosActualizados.password;

    const usuarioActualizado = await User.findByIdAndUpdate(
      userId,
      datosActualizados,
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado correctamente",
      user: {
        id: usuarioActualizado._id,
        nombre: usuarioActualizado.nombre,
        correo: usuarioActualizado.correo,
        imagen: usuarioActualizado.imagen,
        rol: usuarioActualizado.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", detail: error.message });
  }
};

// Obtener perfil del usuario autenticado
export const perfilUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select("-password");

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      imagen: usuario.imagen,
      rol: usuario.rol
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", detail: error.message });
  }
};

// Obtener todos los usuarios (solo admin)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuarios",
      detail: error.message
    });
  }
};

// Eliminar usuario (solo admin)
export const deleteUser = async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario",
      detail: error.message,
    });
  }
};
