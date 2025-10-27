const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../errors/customErrors');

// In-memory database with sample data
let products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'High-performance gaming laptop',
    price: 1299.99,
    category: 'Electronics',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    price: 29.99,
    category: 'Electronics',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Office Chair',
    description: 'Comfortable ergonomic office chair',
    price: 249.99,
    category: 'Furniture',
    inStock: false,
    createdAt: new Date().toISOString()
  }
];

// Helper function for async error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /api/products/stats - Get product statistics (must be before /:id)
router.get('/stats', asyncHandler(async (req, res) => {
  const stats = {};
  
  products.forEach(product => {
    const category = product.category;
    stats[category] = (stats[category] || 0) + 1;
  });
  
  res.json({
    success: true,
    data: {
      totalProducts: products.length,
      byCategory: stats,
      inStock: products.filter(p => p.inStock).length,
      outOfStock: products.filter(p => !p.inStock).length,
      averagePrice: products.length > 0 
        ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
        : 0
    }
  });
}));

// GET /api/products - List all products (with filtering, pagination, search)
router.get('/', asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Pagination
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    count: paginatedProducts.length,
    total: filteredProducts.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(filteredProducts.length / limitNum),
    data: paginatedProducts
  });
}));

// GET /api/products/:id - Get specific product
router.get('/:id', asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }
  
  res.json({
    success: true,
    data: product
  });
}));

// POST /api/products - Create new product
router.post('/', validateProduct, asyncHandler(async (req, res) => {
  const { name, description, price, category, inStock = true } = req.body;
  
  const newProduct = {
    id: uuidv4(),
    name: name.trim(),
    description: description.trim(),
    price,
    category: category.trim(),
    inStock,
    createdAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
}));

// PUT /api/products/:id - Update product
router.put('/:id', validateProduct, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, inStock } = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  
  const updatedProduct = {
    ...products[productIndex],
    name: name.trim(),
    description: description.trim(),
    price,
    category: category.trim(),
    inStock,
    updatedAt: new Date().toISOString()
  };
  
  products[productIndex] = updatedProduct;
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct
  });
}));

// DELETE /api/products/:id - Delete product
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct
  });
}));

module.exports = router;
