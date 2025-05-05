import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Espera que el token venga en el header Authorization: Bearer <token>
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Esto te da acceso a req.user.id, req.user.correo, etc.
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
