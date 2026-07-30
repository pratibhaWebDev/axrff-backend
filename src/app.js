const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to AXRWeb Backend API', health: '/health' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/upload', uploadRoutes);

// Fallbacks & Error Handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
