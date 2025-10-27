import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats
} from '../models/products.js';

export const listProducts = (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const data = getAllProducts({ category, search, page: Number(page), limit: Number(limit) });
  res.json(data);
};

export const productStats = (req, res) => {
  res.json(getStats());
};

