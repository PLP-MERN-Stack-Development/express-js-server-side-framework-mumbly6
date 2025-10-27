import express from 'express';
import {
  listProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  productStats
} from '../controllers/productsController.js';
import validateProduct from '../middleware/validateProduct.js';

const router = express.Router();

router.get('/', listProducts);                 // supports ?category=, ?search=, ?page=, ?limit=
router.get('/stats', productStats);            // /api/products/stats
router.get('/:id', getProduct);
router.post('/', validateProduct, addProduct);
router.put('/:id', validateProduct, editProduct);
router.delete('/:id', removeProduct);

export default router;


