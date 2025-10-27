import { v4 as uuidv4 } from 'uuid';

let products = [];

export const getAllProducts = ({ category, search, page, limit }) => {
  let result = [...products];

  if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const end = start + limit;
  return result.slice(start, end);
};

export const getProductById = (id) => products.find(p => p.id === id);

export const createProduct = (data) => {
  const newProduct = { id: uuidv4(), ...data };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, data) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
};

export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

export const getStats = () => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  return stats;
};

