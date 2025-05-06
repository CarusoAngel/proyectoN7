import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('id nombre correo imagen');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
