const { product } = require('../models');

const getAllProducts = async () => {
  const products = await product.findAll();
  return products;
};

module.exports = {
  getAllProducts,
};