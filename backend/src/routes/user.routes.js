import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
  updateUser,
  perfilUsuario,
  deleteUser
} from "../controllers/user.controller.js";
import upload from "../config/multer.config.js";
import auth from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// Registro de usuario con imagen
router.post("/register", (req, res, next) => {
  upload.single("imagen")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: "Error al subir imagen", detail: err.message });
    }
    next();
  });
}, registerUser);

// Login de usuario
router.post("/login", loginUser);

// Verificación de token
router.get("/verifytoken", auth, verifyToken);

// Ver perfil del usuario autenticado
router.get("/perfil", auth, perfilUsuario);

// Actualizar usuario autenticado (con imagen opcional)
router.put("/update", auth, upload.single("imagen"), updateUser);

// Obtener todos los usuarios (solo ADMIN)
router.get("/all", auth, getAllUsers);

// Eliminar usuario (solo admin)
router.delete("/:id", auth, deleteUser);

export default router;