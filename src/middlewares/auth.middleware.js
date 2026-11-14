
import jwt from 'jsonwebtoken';

// ========================================
// VERIFICAR TOKEN JWT
// ========================================
export function verifyToken(req, res, next) {
  try {
    // Obtener el encabezado Authorization
    const authHeader = req.headers.authorization;

    // Comprobar formato Bearer
    if (
      !authHeader ||
      !/^Bearer\s+\S+$/i.test(authHeader)
    ) {
      return res.status(401).json({
        message: 'Token no proporcionado o formato inválido'
      });
    }

    // Extraer el token
    const token = authHeader.split(/\s+/)[1];

    // Verificar configuración del servidor
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('JWT_SECRET no está configurado');

      return res.status(500).json({
        message: 'Error interno del servidor'
      });
    }

    // Verificar firma y vencimiento
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256']
    });

    // Guardar los datos del usuario autenticado
    req.user = decoded;

    // Continuar hacia el siguiente middleware
    next();

  } catch (error) {

    // Token vencido
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expirado'
      });
    }

    // Token inválido
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Token inválido'
      });
    }

    console.error('Error al verificar JWT:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}

// ========================================
// VERIFICAR PERMISOS DE ADMINISTRADOR
// ========================================
export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      message: 'No tienes permisos para esta operación'
    });
  }

  next();
}
