import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken
} from "../controllers/user.controller.js";
import { uploadPhoto } from "../config/multer.config.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Registro de usuario con imagen 
router.post("/register", uploadPhoto("usuarios", "imagen"), registerUser);

// Login de usuario
router.post("/login", loginUser);

// Verificación de token con middleware de autenticación
router.get("/verifytoken", authMiddleware, verifyToken);

export default router;
