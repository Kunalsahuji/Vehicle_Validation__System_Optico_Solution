const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Database connection
const db = require('./config/db');
db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server is running on port :', PORT);
});
