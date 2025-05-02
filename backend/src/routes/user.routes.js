import express from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { uploadPhoto } from '../services/files/multer.config.js';

const router = express.Router();

// Ruta de registro con subida de imagen
router.post('/register', uploadPhoto('usuarios', 'file'), registerUser);

export default router;