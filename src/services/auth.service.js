
import jwt from 'jsonwebtoken';
import { timingSafeEqual } from 'node:crypto';

// ========================================
// COMPARAR CREDENCIALES
// ========================================
function secureCompare(value, expected) {
  const a = Buffer.from(value);
  const b = Buffer.from(expected);

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

// ========================================
// AUTENTICAR USUARIO
// ========================================
export async function loginService(email, password) {

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    const error = new Error(
      'Debes proporcionar correo y contraseña'
    );
    error.status = 400;
    throw error;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  // Comprobar configuración del servidor
  if (!adminEmail || !adminPassword || !jwtSecret) {
    throw new Error(
      'Faltan variables de entorno para autenticación'
    );
  }

  // Validar las credenciales
  const validEmail = secureCompare(email, adminEmail);
  const validPassword = secureCompare(
    password,
    adminPassword
  );

  if (!validEmail || !validPassword) {
    const error = new Error(
      'Credenciales incorrectas'
    );
    error.status = 401;
    throw error;
  }

  // Generar JWT
  const token = jwt.sign(
    {
      email: adminEmail,
      role: 'admin'
    },
    jwtSecret,
    {
      expiresIn: '1h',
      algorithm: 'HS256'
    }
  );

  return {
    token,
    tokenType: 'Bearer',
    expiresIn: 3600
  };
}
