import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

import { uploadPhoto } from '../config/multer.config.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

// Crear producto con imagen y autenticación
router.post(
  '/',
  auth,
  uploadPhoto('productos', 'imagen'),
  createProduct
);

// Obtener todos los productos (público)
router.get('/', getAllProducts);

// Obtener un producto por ID (público)
router.get('/:id', getProductById);

// Actualizar producto (puede incluir nueva imagen)
router.put(
  '/:id',
  auth,
  uploadPhoto('productos', 'imagen'),
  updateProduct
);

// Eliminar producto (requiere autenticación)
router.delete('/:id', auth, deleteProduct);

export default router;