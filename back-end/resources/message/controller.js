const { StatusCodes } = require('http-status-codes');
const model = require('./model');

const findAllMessages = async (req, res) => {
  try {
    const products = await model.findAll();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { findAllMessages };