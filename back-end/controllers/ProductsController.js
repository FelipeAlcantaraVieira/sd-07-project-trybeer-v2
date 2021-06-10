const { productService } = require('../services');
const { OK } = require('./HttpCodes');

const getAllProducts = async (_req, res) => {
    const products = await productService.getAllProducts();
    res.status(OK).json(products);
};

module.exports = {
  getAllProducts,
};