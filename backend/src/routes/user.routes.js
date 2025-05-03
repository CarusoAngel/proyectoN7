import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { uploadPhoto } from '../services/files/multer.config.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Registro con imagen
router.post('/register', uploadPhoto('usuarios', 'file'), registerUser);

// Login de usuario
router.post('/login', loginUser);

// Verificación de token (ruta protegida)
router.get('/verifytoken', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Token válido',
    user: req.user
  });
});

export default router;
