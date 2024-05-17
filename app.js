import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import dataRoutes from './routes/data.js';

dotenv.config();

const app = express();
const port = 3001;

// Configurar CORS
app.use(cors());

// Configurar Express para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDatabase();

// Usar las rutas
app.use('/api', dataRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
