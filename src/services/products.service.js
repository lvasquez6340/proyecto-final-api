
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../models/products.model.js';

// ========================================
// OBTENER TODOS LOS PRODUCTOS (GET)
// ========================================
export async function getProductsService() {
  return await getAllProducts();
}

// ========================================
// OBTENER UN PRODUCTO POR ID (GET)
// ========================================
export async function getProductByIdService(id) {
  return await getProductById(id);
}

// ========================================
// VALIDAR DATOS DE UN PRODUCTO
// ========================================
function validateProduct(productData) {

  if (
    !productData ||
    typeof productData !== 'object' ||
    Array.isArray(productData)
  ) {
    const error = new Error('Datos del producto inválidos');
    error.status = 400;
    throw error;
  }

  const {
    name,
    category,
    type,
    gender,
    size,
    color,
    price,
    stock
  } = productData;

  // Validar campos de texto
  const fields = {
    name,
    category,
    type,
    gender,
    size,
    color
  };

  for (const [field, value] of Object.entries(fields)) {
    if (typeof value !== 'string' || !value.trim()) {
      const error = new Error(`Campo inválido: ${field}`);
      error.status = 400;
      throw error;
    }
  }

  // Validar categoría
  if (!['casual', 'formal'].includes(category)) {
    const error = new Error(
      'La categoría debe ser casual o formal'
    );
    error.status = 400;
    throw error;
  }

  // Validar precio
  if (
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    const error = new Error(
      'El precio debe ser mayor que cero'
    );
    error.status = 400;
    throw error;
  }

  // Validar stock
  if (!Number.isInteger(stock) || stock < 0) {
    const error = new Error(
      'El stock debe ser un número entero no negativo'
    );
    error.status = 400;
    throw error;
  }

  return {
    name: name.trim(),
    category,
    type: type.trim(),
    gender: gender.trim(),
    size: size.trim(),
    color: color.trim(),
    price,
    stock,
    currency: 'ARS'
  };
}

// ========================================
// CREAR UN PRODUCTO (POST)
// ========================================
export async function createProductService(productData) {
  const newProduct = validateProduct(productData);

  return await createProduct(newProduct);
}

// ========================================
// ACTUALIZAR UN PRODUCTO (PUT)
// ========================================
export async function updateProductService(id, productData) {
  const updatedData = validateProduct(productData);

  return await updateProduct(id, updatedData);
}

// ========================================
// ELIMINAR UN PRODUCTO (DELETE)
// ========================================
export async function deleteProductService(id) {
  return await deleteProduct(id);
}

