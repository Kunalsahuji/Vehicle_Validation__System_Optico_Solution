const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
// CORS configuration
app.use(cors
  ({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

// Database connection
const db = require('./config/db');
db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan setup
const morgan = require('morgan');
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', superAdminRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server is running on port :', PORT);
});
