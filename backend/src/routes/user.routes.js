import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { uploadPhoto } from '../config/multer.config.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 📸 Registro con subida de imagen
router.post('/register', uploadPhoto('usuarios', 'file'), registerUser);

// 🔐 Login de usuario
router.post('/login', loginUser);

// 🔒 Verificación de token (ruta protegida)
router.get('/verifytoken', authMiddleware, async (req, res) => {
  try {
    const { id, nombre, correo, imagen } = req.user;
    res.status(200).json({
      message: 'Token válido',
      user: {
        id,
        nombre,
        correo,
        imagen
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al procesar token',
      detail: error.message
    });
  }
});

export default router;
