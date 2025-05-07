import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware para recibir JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Rutas API
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('🚀 API de Stellare Industries funcionando!');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend escuchando en http://localhost:${PORT}`);
});
