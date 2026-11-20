
import 'dotenv/config';
import {
  initializeApp,
  applicationDefault,
  cert
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Credenciales locales o de Vercel
const credential = process.env.FIREBASE_SERVICE_ACCOUNT
  ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  : applicationDefault();

// Inicializar Firebase Admin
const app = initializeApp({
  credential
});

// Obtener la instancia de Firestore
const db = getFirestore(app);

export { db };

