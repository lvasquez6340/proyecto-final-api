
import { db } from './src/config/firebase.js';

const productos = [
  {
    name: 'Remera básica de algodón',
    category: 'casual',
    type: 'remera',
    gender: 'unisex',
    size: 'M',
    color: 'Blanco',
    price: 18000,
    stock: 25
  },
  {
    name: 'Jean slim fit',
    category: 'casual',
    type: 'pantalón',
    gender: 'hombre',
    size: '42',
    color: 'Azul oscuro',
    price: 55000,
    stock: 15
  },
  {
    name: 'Campera de denim',
    category: 'casual',
    type: 'campera',
    gender: 'unisex',
    size: 'L',
    color: 'Azul',
    price: 85000,
    stock: 10
  },
  {
    name: 'Buzo con capucha',
    category: 'casual',
    type: 'buzo',
    gender: 'unisex',
    size: 'M',
    color: 'Gris',
    price: 42000,
    stock: 20
  },
  {
    name: 'Pantalón chino',
    category: 'casual',
    type: 'pantalón',
    gender: 'hombre',
    size: '40',
    color: 'Beige',
    price: 48000,
    stock: 12
  },
  {
    name: 'Camisa de lino',
    category: 'casual',
    type: 'camisa',
    gender: 'hombre',
    size: 'M',
    color: 'Celeste',
    price: 46000,
    stock: 14
  },
  {
    name: 'Traje clásico de dos piezas',
    category: 'formal',
    type: 'traje',
    gender: 'hombre',
    size: '48',
    color: 'Azul marino',
    price: 245000,
    stock: 6
  },
  {
    name: 'Camisa de vestir',
    category: 'formal',
    type: 'camisa',
    gender: 'hombre',
    size: 'M',
    color: 'Blanco',
    price: 52000,
    stock: 18
  },
  {
    name: 'Pantalón de vestir',
    category: 'formal',
    type: 'pantalón',
    gender: 'hombre',
    size: '42',
    color: 'Negro',
    price: 69000,
    stock: 12
  },
  {
    name: 'Blazer entallado',
    category: 'formal',
    type: 'blazer',
    gender: 'mujer',
    size: 'M',
    color: 'Negro',
    price: 115000,
    stock: 8
  },
  {
    name: 'Vestido de cóctel',
    category: 'formal',
    type: 'vestido',
    gender: 'mujer',
    size: 'S',
    color: 'Bordó',
    price: 98000,
    stock: 9
  },
  {
    name: 'Zapatos Oxford de cuero',
    category: 'formal',
    type: 'calzado',
    gender: 'hombre',
    size: '41',
    color: 'Marrón',
    price: 125000,
    stock: 7
  }
];

async function cargarProductos() {
  try {
    const coleccion = db.collection('products');

    const existentes = await coleccion.limit(1).get();

    if (!existentes.empty) {
      console.log(
        'La colección products ya contiene datos. Se cancela la carga para evitar duplicados.'
      );
      return;
    }

    console.log('Iniciando carga de productos...');

    const batch = db.batch();

    for (const producto of productos) {
      const referencia = coleccion.doc();

      batch.set(referencia, {
        ...producto,
        currency: 'ARS'
      });
    }

    await batch.commit();

    console.log(
      `Carga exitosa: ${productos.length} productos agregados.`
    );
  } catch (error) {
    console.error('Error al cargar productos:', error);
    process.exitCode = 1;
  }
}

cargarProductos();
