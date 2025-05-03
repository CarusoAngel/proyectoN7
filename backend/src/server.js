import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Configura CORS antes de cualquier ruta
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Lectura del JSON
app.use(express.json());

// Middlewares y rutas
app.use('/api/v1/user', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.get('/', (req, res) => {
  res.send('API de Stellare Industries funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
