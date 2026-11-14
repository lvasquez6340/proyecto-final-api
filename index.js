
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();

const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARES GLOBALES
// ========================================
app.use(cors());

// Express incluye el analizador JSON.
// Equivale al uso habitual de body-parser.json().
app.use(express.json());

// ========================================
// RUTAS DE LA API
// ========================================
app.use('/api/products', productsRouter);
app.use('/auth', authRouter);

// ========================================
// RUTA PRINCIPAL
// ========================================
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Bienvenido a nuestra API de ropa'
  });
});

// ========================================
// RUTAS NO ENCONTRADAS (404)
// ========================================
app.use((req, res) => {
  return res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================
app.listen(PORT, () => {
  console.log(
    `Servidor funcionando en http://localhost:${PORT}`
  );
});
