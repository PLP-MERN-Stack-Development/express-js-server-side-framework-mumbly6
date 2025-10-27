// Global Error Handler Middleware
// Handles all errors and sends appropriate responses

const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('❌ Error:', err.name);
  console.error('Message:', err.message);
  
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }
  
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }
  
  // Build error response
  const errorResponse = {
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        name: err.name
      })
    }
  };
  
  // Send error response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
