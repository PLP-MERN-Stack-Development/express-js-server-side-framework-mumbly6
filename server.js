const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Import middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logger middleware
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      stats: '/api/products/stats'
    }
  });
});

// Product routes (protected with auth middleware)
const productRoutes = require('./routes/products');
app.use('/api/products', auth, productRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/products`);
  console.log(`🔑 Remember to include x-api-key header`);
});

module.exports = app;


