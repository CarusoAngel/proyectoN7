import express from 'express';
import dotenv from 'dotenv';
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

// Middlewares y rutas
app.use('/api/v1/user', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.get('/', (req, res) => {
  res.send('API de Stellare Industries funcionando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
