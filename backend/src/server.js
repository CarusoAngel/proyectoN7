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
import checkoutRoutes from './routes/checkout.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// CORS dinámico para desarrollo y producción
const whitelist = [
  'http://localhost:5173',
  'https://proyecto-n7.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  },
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
app.use('/api/checkout', checkoutRoutes); // REGISTRO DE RUTA DE MP

// Ruta base
app.get('/', (req, res) => {
  res.send('API de Stellare Industries funcionando!');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});