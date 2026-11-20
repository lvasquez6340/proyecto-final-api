
# Proyecto Final - API REST de Productos

API REST para la gestión de productos de una tienda de ropa, desarrollada con **Node.js, Express y Firebase Firestore**.

El proyecto implementa operaciones CRUD, autenticación mediante JWT, validaciones de datos y protección de rutas administrativas.

La API se encuentra desplegada en Vercel y permite consultar productos mediante solicitudes HTTP.

## API desplegada

**URL principal:**

https://proyecto-final-api-three.vercel.app/

**Consultar productos:**

https://proyecto-final-api-three.vercel.app/api/products

**Repositorio GitHub:**

https://github.com/lvasquez6340/proyecto-final-api

## Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- Firebase Admin SDK
- JSON Web Token (JWT)
- dotenv
- CORS
- Git y GitHub
- Vercel

## Funcionalidades

- Listar todos los productos.
- Consultar un producto por ID.
- Crear productos.
- Actualizar productos.
- Eliminar productos.
- Validar los datos recibidos.
- Autenticar administradores mediante JWT.
- Proteger operaciones de escritura.
- Manejar errores HTTP.

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/lvasquez6340/proyecto-final-api.git
cd proyecto-final-api
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

Crear la carpeta `credentials` y colocar allí el archivo `serviceAccountKey.json`, descargado desde una cuenta de servicio autorizada de Firebase.

Las credenciales privadas no deben publicarse en GitHub.

Para el despliegue en Vercel se utilizan las variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `FIREBASE_SERVICE_ACCOUNT`

La variable `FIREBASE_SERVICE_ACCOUNT` contiene las credenciales JSON de la cuenta de servicio, configuradas de forma privada en Vercel.

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

| Método | Ruta | Autenticación | Descripción |
|---|---|---|---|
| GET | `/api/products` | Pública | Listar productos |
| GET | `/api/products/:id` | Pública | Consultar producto por ID |
| POST | `/api/products/create` | Admin JWT | Crear producto |
| PUT | `/api/products/:id` | Admin JWT | Actualizar producto |
| DELETE | `/api/products/:id` | Admin JWT | Eliminar producto |
| POST | `/auth/login` | Pública | Obtener token JWT |

## Autenticación JWT

Para iniciar sesión, enviar una solicitud:

**POST**

```text
https://proyecto-final-api-three.vercel.app/auth/login
```

Con el siguiente cuerpo JSON:

```json
{
  "email": "admin@ejemplo.com",
  "password": "CONTRASENA_CONFIGURADA"
}
```

Las credenciales deben corresponder al administrador configurado en las variables de entorno.

Si la autenticación es correcta, el servidor devuelve un token JWT válido durante una hora.

Para acceder a las rutas protegidas, agregar la cabecera:

```http
Authorization: Bearer TU_TOKEN
```

**Nota de seguridad:** la autenticación mediante un administrador configurado en variables de entorno es una implementación académica. No constituye un sistema completo de gestión de usuarios para producción.

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

### Validaciones

- `category` admite `casual` o `formal`.
- `price` debe ser mayor que cero.
- `stock` debe ser un número entero no negativo.
- Los campos del producto deben respetar los tipos y valores admitidos por la API.

## Pruebas de la API desplegada

Se recomienda utilizar **Postman**, Thunder Client o una herramienta equivalente.

### 1. Consultar todos los productos

**GET**

```text
https://proyecto-final-api-three.vercel.app/api/products
```

No requiere autenticación.

Devuelve un arreglo JSON con los productos almacenados en Firestore.

### 2. Consultar un producto por ID

**GET**

```text
https://proyecto-final-api-three.vercel.app/api/products/ID_DEL_PRODUCTO
```

Reemplazar `ID_DEL_PRODUCTO` por un identificador obtenido del listado.

### 3. Iniciar sesión

**POST**

```text
https://proyecto-final-api-three.vercel.app/auth/login
```

En Postman, seleccionar:

- Body
- raw
- JSON

Enviar las credenciales de administrador autorizadas para la evaluación.

Copiar el token JWT devuelto por el servidor.

### 4. Crear un producto

**POST**

```text
https://proyecto-final-api-three.vercel.app/api/products/create
```

En Postman, configurar:

**Authorization:**

- Type: Bearer Token
- Token: token obtenido en el login

**Body → raw → JSON:**

```json
{
  "name": "Producto de prueba",
  "category": "casual",
  "type": "remera",
  "gender": "unisex",
  "size": "M",
  "color": "Azul",
  "price": 25000,
  "stock": 10,
  "currency": "ARS"
}
```

Si la operación es correcta, la API crea el producto en Firestore.

Guardar el ID del producto creado para las siguientes pruebas.

### 5. Actualizar un producto

**PUT**

```text
https://proyecto-final-api-three.vercel.app/api/products/ID_DEL_PRODUCTO
```

Configurar la autenticación Bearer Token.

Ejemplo de actualización:

```json
{
  "price": 30000,
  "stock": 15
}
```

Reemplazar `ID_DEL_PRODUCTO` por el identificador del producto de prueba.

### 6. Eliminar un producto

**DELETE**

```text
https://proyecto-final-api-three.vercel.app/api/products/ID_DEL_PRODUCTO
```

Configurar la autenticación Bearer Token.

Reemplazar `ID_DEL_PRODUCTO` por el identificador del producto de prueba.

**Advertencia:** la eliminación modifica la base de datos. Se recomienda utilizar exclusivamente productos creados para las pruebas.

### 7. Verificar la protección de rutas

Intentar realizar una solicitud POST a:

```text
https://proyecto-final-api-three.vercel.app/api/products/create
```

Sin enviar un token JWT.

Resultado esperado:

```http
HTTP/1.1 401 Unauthorized
```

Ejemplo de respuesta:

```json
{
  "message": "Token no proporcionado o formato inválido"
}
```

## Carga inicial de productos

El archivo `seedProducts.js` contiene 12 productos de ejemplo para inicializar la colección `products`.

Ejecutar únicamente cuando corresponda inicializar una colección vacía:

```bash
node seedProducts.js
```

No ejecutar repetidamente sobre una base de datos que ya contenga productos.

La cantidad de productos almacenados puede variar como resultado de las operaciones CRUD.

## Códigos HTTP

| Código | Descripción |
|---|---|
| 200 | Operación exitosa |
| 201 | Producto creado |
| 400 | Datos inválidos |
| 401 | Autenticación requerida o inválida |
| 403 | Permisos insuficientes |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## Seguridad

Los siguientes elementos están excluidos del repositorio mediante `.gitignore`:

- `node_modules/`
- `.env`
- `credentials/`

No deben publicarse contraseñas, tokens JWT ni claves privadas de Firebase.

Las credenciales de administrador para la evaluación deben proporcionarse por un canal privado y autorizado, nunca dentro de este README.

## Estado del proyecto

- API REST desarrollada con Node.js y Express.
- Persistencia de datos mediante Firebase Firestore.
- Operaciones CRUD probadas localmente.
- Autenticación JWT implementada.
- Protección de rutas administrativas implementada.
- Validaciones de productos verificadas.
- Despliegue realizado en Vercel.
- Consulta de productos verificada en producción.
- Login JWT verificado en producción.
- Rechazo HTTP 401 sin token verificado en producción.

**Proyecto Final - TechLab**