# Proyecto 7 - Stellare Industries – eCommerce con Pasarela de Pago

## Descripción

Stellare Industries es una aplicación web fullstack para comercio electrónico, construida con el stack MERN (MongoDB, Express, React, Node.js), que permite la gestión de productos, usuarios, autenticación segura, flujo de compras y pagos integrados con MercadoPago. Ofrece tanto registro/login tradicional como compras como invitado.

## Características Principales

- Registro de usuario con imagen opcional (funciona con o sin imagen desde frontend).
- Validación de correo duplicado.
- Inicio de sesión seguro con JWT.
- Validación y verificación de token.
- CRUD completo de productos con imágenes.
- Autenticación y autorización con middleware.
- Compra como usuario registrado o invitado.
- Integración con MercadoPago.
- Confirmación de órdenes tras pago aprobado.
- Visualización de órdenes (usuario y admin).
- Eliminación de usuarios (solo admin).
- Migración de almacenamiento de imágenes a Cloudinary para evitar problemas de persistencia en producción.

## Endpoints Principales

### Usuarios (`/api/v1/user`)

- `POST /register` – Registro de usuario con imagen opcional.
- `POST /login` – Inicio de sesión.
- `GET /verifytoken` – Verificación del token JWT.
- `GET /perfil` – Obtener datos del usuario autenticado.
- `PUT /update` – Actualizar datos del usuario autenticado.
- `GET /all` – Obtener todos los usuarios (solo admin).
- `DELETE /:id` – Eliminar usuario (solo admin).

### Productos (`/api/v1/product`)

- `POST /` – Crear producto con imagen (protegido).
- `GET /` – Obtener todos los productos.
- `GET /:id` – Obtener producto por ID.
- `PUT /:id` – Actualizar producto (protegido).
- `DELETE /:id` – Eliminar producto (protegido).

### Órdenes (`/api/v1/order`)

- `POST /` – Crear orden como usuario logueado.
- `POST /invitado` – Crear orden como invitado.
- `GET /mis-ordenes` – Obtener órdenes del usuario autenticado.
- `GET /todas` – Obtener todas las órdenes (solo admin).
- `POST /confirmar` – Confirmar orden tras pago aprobado.

### MercadoPago (`/api/checkout`)

- `POST /create-preference` – Generar preferencia de pago.

## Requisitos del Proyecto

- Arquitectura modular con carpetas: `controllers`, `routes`, `models`, `middlewares`, `config`, `uploads`.
- Implementación de autenticación y autorización con JWT.
- Middleware para protección de rutas.
- CRUD funcional de productos con carga de imagen vía `Multer` + Cloudinary.
- Validación de datos y errores.
- Flujo completo de pago e integración con MercadoPago.
- Panel de órdenes para usuarios y administradores.
- Documentación y uso de control de versiones con GitHub.

## Observaciones Técnicas

- Durante la etapa de desarrollo, detecté que MongoDB estaba usando por defecto la base `test` en vez de `stellareDB`. Decidí mantener `test` como base final ya que todo estaba configurado y operativo allí, evitando migraciones innecesarias que pudieran romper el sistema.
- Migré todo el sistema de imágenes a Cloudinary, ya que Render me eliminaba los archivos locales después de cada reinicio. Gracias a Cloudinary, las imágenes ahora son persistentes y accesibles desde cualquier entorno.

## Tecnologías Utilizadas

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React, Vite, Tailwind CSS
- Autenticación: JWT, bcryptjs
- Subida de imágenes: Multer + Cloudinary
- Pasarela de pago: MercadoPago
- Otros: Dotenv, CORS

## Instalación Local

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno en `.env`:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=clave
   ```
4. Ejecutar el servidor:
   ```bash
   npm run dev
   ```

## Despliegue

El backend se encuentra desplegado en Render:  
https://stellare-backend.onrender.com

El frontend se encuentra desplegado en Vercel:  
https://proyecto-n7.vercel.app

## Documentación de Endpoints

Los endpoints están organizados por carpetas en Postman, y todos han sido verificados manualmente.

Encabezado necesario para rutas protegidas:

```http
Authorization: Bearer <token>
```

Formato de datos:

- JSON para peticiones normales.
- form-data para peticiones con imagen (`multipart/form-data`).

## Estado del Proyecto

✔️ Registro con imagen funcional y también sin imagen.  
✔️ Validación de correo duplicado implementada.  
✔️ Login con JWT funcionando.  
✔️ Middleware de autenticación activo.  
✔️ CRUD completo de productos con imagen (Cloudinary).  
✔️ Protección de rutas implementada.  
✔️ Eliminación de usuarios protegida (solo admin).  
✔️ Integración funcional con MercadoPago.  
✔️ Flujo de compra completo (invitado y usuario).  
✔️ Confirmación de órdenes implementada.  
✔️ Visualización de órdenes por usuario y admin.  
✔️ Despliegue exitoso de backend y frontend.  

## Autor

Desarrollado por: Angel Caruso