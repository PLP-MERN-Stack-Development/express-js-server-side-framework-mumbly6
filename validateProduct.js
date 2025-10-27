// Product Validation Middleware
// Validates product data for create and update operations

const { ValidationError } = require('../errors/customErrors');

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  
  // Check required fields
  if (!name || !description || !category) {
    return next(new ValidationError('Missing required fields: name, description, and category are required'));
  }
  
  // Validate name
  if (typeof name !== 'string' || name.trim().length === 0) {
    return next(new ValidationError('Name must be a non-empty string'));
  }
  
  // Validate description
  if (typeof description !== 'string' || description.trim().length === 0) {
    return next(new ValidationError('Description must be a non-empty string'));
  }
  
  // Validate price
  if (price === undefined || price === null) {
    return next(new ValidationError('Price is required'));
  }
  
  if (typeof price !== 'number' || price < 0) {
    return next(new ValidationError('Price must be a positive number'));
  }
  
  // Validate category
  if (typeof category !== 'string' || category.trim().length === 0) {
    return next(new ValidationError('Category must be a non-empty string'));
  }
  
  // Validate inStock
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    return next(new ValidationError('inStock must be a boolean value'));
  }
  
  next();
};

module.exports = validateProduct;
