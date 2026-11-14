
import { loginService } from '../services/auth.service.js';

// ========================================
// INICIAR SESIÓN (LOGIN)
// ========================================
export async function loginController(req, res) {
  try {
    // Obtener las credenciales del body
    const { email, password } = req.body ?? {};

    // Validar credenciales y generar JWT
    const authData = await loginService(email, password);

    // Responder con el token
    return res.status(200).json({
      message: 'Autenticación exitosa',
      ...authData
    });

  } catch (error) {

    // Datos incompletos o inválidos
    if (error.status === 400) {
      return res.status(400).json({
        message: error.message
      });
    }

    // Credenciales incorrectas
    if (error.status === 401) {
      return res.status(401).json({
        message: error.message
      });
    }

    // Error inesperado
    console.error('Error de autenticación:', error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}
