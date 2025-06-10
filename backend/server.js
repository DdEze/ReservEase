require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const spaceRoutes = require('./routes/spaceRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/spaces', spaceRoutes);

// Conectar base de datos y arrancar servidor
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});