
import { db } from '../config/firebase.js';

// ========================================
// OBTENER TODOS LOS PRODUCTOS
// ========================================
export async function getAllProducts() {
  const snapshot = await db.collection('products').get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

// ========================================
// OBTENER UN PRODUCTO POR ID
// ========================================
export async function getProductById(id) {
  const doc = await db.collection('products').doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data()
  };
}

// ========================================
// CREAR UN PRODUCTO NUEVO
// ========================================
export async function createProduct(productData) {
  const docRef = await db.collection('products').add(productData);

  return {
    id: docRef.id,
    ...productData
  };
}

// ========================================
// ACTUALIZAR UN PRODUCTO POR ID
// ========================================
export async function updateProduct(id, productData) {
  const docRef = db.collection('products').doc(id);

  const doc = await docRef.get();

  // Verificar si existe el producto
  if (!doc.exists) {
    return null;
  }

  // Actualizar los datos en Firestore
  await docRef.update(productData);

  // Obtener el documento actualizado
  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data()
  };
}

 // ========================================
 // ELIMINAR UN PRODUCTO POR ID (DELETE)
 // ========================================
export async function deleteProduct(id) {
  const docRef = db.collection('products').doc(id);

  // Verificar si existe
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  // Eliminar el documento de Firestore
  await docRef.delete();

  return true;
}
