import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
  updateUser,
  perfilUsuario
} from "../controllers/user.controller.js";
import { uploadPhoto } from "../config/multer.config.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// Registro de usuario con imagen
router.post("/register", uploadPhoto("usuarios", "imagen"), registerUser);

// Login de usuario
router.post("/login", loginUser);

// Verificación de token
router.get("/verifytoken", auth, verifyToken);

// Ver perfil del usuario autenticado
router.get("/perfil", auth, perfilUsuario);

// Actualizar usuario autenticado
router.put("/update", auth, updateUser);

export default router;