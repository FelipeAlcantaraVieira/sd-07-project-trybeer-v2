const { Product } = require('../../models');

const getAll = async () => (Product.findAll());

module.exports = { getAll };
