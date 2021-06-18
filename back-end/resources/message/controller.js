const { StatusCodes } = require('http-status-codes');
const model = require('./model');

const findAllMessages = async (req, res) => {
  try {
    console.log('achou');
    const products = await model.findAll();
    console.log(products);
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { findAllMessages };