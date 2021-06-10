const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const getAll = async (_req, res) => {
  try {
    const products = await service.getAll();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { getAll };
