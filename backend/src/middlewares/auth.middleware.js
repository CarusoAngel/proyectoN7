import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('nombre correo imagen rol');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    req.user = {
      id: user._id,
      nombre: user.nombre,
      correo: user.correo,
      imagen: user.imagen,
      rol: user.rol
    };

    next();
  } catch (err) {
    console.error('Error en auth middleware:', err.message);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export default auth;