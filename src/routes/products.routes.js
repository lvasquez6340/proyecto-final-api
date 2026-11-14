
import { Router } from 'express';

import {
  getProducts,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/products.controller.js';

import {
  verifyToken,
  requireAdmin
} from '../middlewares/auth.middleware.js';

const router = Router();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// GET: Obtener todos los productos
router.get('/', getProducts);

// GET: Obtener producto por ID
router.get('/:id', getProductByIdController);

// ========================================
// RUTAS PROTEGIDAS CON JWT
// ========================================

// POST: Crear producto
router.post(
  '/create',
  verifyToken,
  requireAdmin,
  createProductController
);

// PUT: Actualizar producto
router.put(
  '/:id',
  verifyToken,
  requireAdmin,
  updateProductController
);

// DELETE: Eliminar producto
router.delete(
  '/:id',
  verifyToken,
  requireAdmin,
  deleteProductController
);

export default router;

