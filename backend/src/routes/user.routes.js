import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
  updateUser,
  perfilUsuario
} from "../controllers/user.controller.js";
import upload from "../config/multer.config.js"; // ✅ Importa correctamente la nueva instancia de Multer
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// Registro de usuario con imagen
router.post("/register", upload.single("imagen"), registerUser);

// Login de usuario
router.post("/login", loginUser);

// Verificación de token
router.get("/verifytoken", auth, verifyToken);

// Ver perfil del usuario autenticado
router.get("/perfil", auth, perfilUsuario);

// Actualizar usuario autenticado (con imagen opcional)
router.put("/update", auth, upload.single("imagen"), updateUser);

export default router;