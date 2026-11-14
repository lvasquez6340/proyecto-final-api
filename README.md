
# Proyecto Final - API REST de Productos

API REST para la gestión de productos de una tienda de ropa,
desarrollada con Node.js, Express y Firebase Firestore.

Incluye operaciones CRUD, autenticación mediante JWT y
protección de rutas administrativas.

## Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- Firebase Admin SDK
- JSON Web Token (JWT)
- dotenv
- CORS

## Funcionalidades

- Listar todos los productos.
- Consultar un producto por ID.
- Crear productos.
- Actualizar productos.
- Eliminar productos.
- Validar los datos recibidos.
- Autenticar administradores mediante JWT.
- Proteger operaciones de escritura.

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd Proyecto-Final-Api
```

Instalar las dependencias:

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=REEMPLAZAR_CON_UN_SECRETO_SEGURO
ADMIN_EMAIL=REEMPLAZAR_CON_EMAIL_ADMIN
ADMIN_PASSWORD=REEMPLAZAR_CON_PASSWORD_ADMIN
GOOGLE_APPLICATION_CREDENTIALS=./credentials/serviceAccountKey.json
```

Crear la carpeta `credentials` y colocar allí
el archivo `serviceAccountKey.json` descargado
desde una cuenta de servicio autorizada de Firebase.

Las credenciales privadas no deben publicarse.

El proyecto utiliza Firebase Admin SDK para conectarse
a la base de datos Firestore.

## Ejecutar el servidor

Modo normal:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

Servidor local:

http://localhost:3000

## Endpoints

| Método | Ruta | Autenticación |
|--------|------|---------------|
| GET | /api/products | Pública |
| GET | /api/products/:id | Pública |
| POST | /api/products/create | Admin JWT |
| PUT | /api/products/:id | Admin JWT |
| DELETE | /api/products/:id | Admin JWT |
| POST | /auth/login | Pública |

## Autenticación JWT

Enviar una solicitud POST a:

`/auth/login`

Ejemplo del cuerpo:

```json
{
  "email": "admin@ejemplo.com",
  "password": "CONTRASENA_CONFIGURADA"
}
```

Si las credenciales son correctas, el servidor
devuelve un token JWT válido durante una hora.

Para las rutas protegidas, incluir:

```http
Authorization: Bearer TU_TOKEN
```

La autenticación con administrador configurado en
variables de entorno es una implementación académica.
No debe utilizarse como sistema de usuarios de producción.

## Ejemplo de producto

```json
{
  "name": "Remera básica de algodón",
  "category": "casual",
  "type": "remera",
  "gender": "unisex",
  "size": "M",
  "color": "Blanco",
  "price": 18000,
  "stock": 25,
  "currency": "ARS"
}
```

Categorías admitidas:

- casual
- formal

El precio debe ser mayor que cero.
El stock debe ser un número entero no negativo.

## Carga inicial de productos

El archivo `seedProducts.js` contiene 12 productos
de ejemplo para inicializar la colección `products`.

Ejecutar únicamente cuando la colección esté vacía:

```bash
node seedProducts.js
```

No ejecutar repetidamente sobre una base de datos
que ya contenga productos.

## Códigos HTTP

- 200: Operación exitosa.
- 201: Producto creado.
- 400: Datos inválidos.
- 401: Autenticación requerida o inválida.
- 403: Permisos insuficientes.
- 404: Recurso no encontrado.
- 500: Error interno del servidor.

## Seguridad

Los siguientes elementos están excluidos de Git:

- node_modules/
- .env
- credentials/

Nunca se deben publicar contraseñas,
tokens JWT ni claves privadas de Firebase.

## Estado del proyecto

CRUD probado con Firestore.
Autenticación JWT probada.
Protección de rutas administrativas probada.
Validaciones de productos verificadas.
