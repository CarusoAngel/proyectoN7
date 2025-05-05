import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

import { uploadPhoto } from '../config/multer.config.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Crear producto con imagen y autenticación
router.post('/', authMiddleware, uploadPhoto('productos', 'imagen'), createProduct);

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Actualizar producto
router.put('/:id', authMiddleware, updateProduct);

// Eliminar producto
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
