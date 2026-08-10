const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const apiRoutes = require('./app/routes/api.routes');
const errorMiddleware = require('./app/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Logger Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static uploads folder
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Server Koperasi Tani Pangan Mandiri Berjalan Normal',
    timestamp: new Date()
  });
});

// API Routes
app.use('/api/v1', apiRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[SERVER] Running on http://localhost:${PORT}`);
  });
}

module.exports = app;
