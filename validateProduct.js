//middleware/validateProduct.js
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (typeof price !== 'number' || typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data types' });
  }
  next();
};
module.exports = validateProduct;
