// Authentication Middleware
// Checks for API key in request headers

require('dotenv').config();
const { UnauthorizedError } = require('../errors/customErrors');

const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  
  if (!apiKey) {
    return next(new UnauthorizedError('API key is required'));
  }
  
  if (apiKey !== process.env.API_KEY) {
    return next(new UnauthorizedError('Invalid API key'));
  }
  
  next();
};

module.exports = auth;

