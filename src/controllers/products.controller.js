
import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
} from '../services/products.service.js';

// ========================================
// OBTENER TODOS LOS PRODUCTOS (GET)
// ========================================
export async function getProducts(req, res) {
  try {
    const products = await getProductsService();

    return res.status(200).json(products);

  } catch (error) {
    console.error('Error al obtener productos:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}

// ========================================
// OBTENER UN PRODUCTO POR ID (GET)
// ========================================
export async function getProductByIdController(req, res) {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    return res.status(200).json(product);

  } catch (error) {
    console.error('Error al buscar producto:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}

// ========================================
// CREAR UN PRODUCTO (POST)
// ========================================
export async function createProductController(req, res) {
  try {
    const newProduct = await createProductService(req.body);

    return res.status(201).json({
      message: 'Producto creado correctamente',
      product: newProduct
    });

  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({
        message: error.message
      });
    }

    console.error('Error al crear producto:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}

// ========================================
// ACTUALIZAR UN PRODUCTO (PUT)
// ========================================
export async function updateProductController(req, res) {
  try {
    const { id } = req.params;

    const updatedProduct = await updateProductService(
      id,
      req.body
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    return res.status(200).json({
      message: 'Producto actualizado correctamente',
      product: updatedProduct
    });

  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({
        message: error.message
      });
    }

    console.error('Error al actualizar producto:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}

// ========================================
// ELIMINAR UN PRODUCTO (DELETE)
// ========================================
export async function deleteProductController(req, res) {
  try {
    const { id } = req.params;

    const deleted = await deleteProductService(id);

    if (!deleted) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    return res.status(200).json({
      message: 'Producto eliminado correctamente'
    });

  } catch (error) {
    console.error('Error al eliminar producto:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}

