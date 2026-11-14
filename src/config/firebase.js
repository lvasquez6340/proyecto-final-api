
import 'dotenv/config';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Inicializar Firebase Admin
const app = initializeApp({
  credential: applicationDefault()
});

// Obtener la instancia de Firestore
const db = getFirestore(app);

export { db };

