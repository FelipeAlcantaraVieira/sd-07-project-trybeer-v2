const { saleService } = require('../services');
const { OK, CREATED, NOTMODIFIED, BADREQUEST, FORBIDDEN, NOTFOUND } = require('./HttpCodes');
const { NOTADMINISTRATOR, SAMESTATUS } = require('../services/errors/SaleMessages');

const createSale = async (req, res) => {
  try {
    const { body, user } = req;
    await saleService.createSale(body, user);
    res.status(CREATED).json({ message: 'Compra realizada com sucesso!' });
  } catch (error) {
    res.status(BADREQUEST).json({ err: { message: error.message } });
  }
};

const getSaleByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const sales = await saleService.getSaleByUserId(id);
    res.status(OK).json(sales);
  } catch (error) {
    res.status(NOTFOUND).json({ err: { message: error.message } });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const { id } = req.user;
    const { saleid } = req.params;
    const prouctSale = await saleService.getSaleProducts(id, saleid);
    res.status(OK).json(prouctSale);
  } catch (error) {
    res.status(NOTFOUND).json({ err: { message: error.message } });
  }
};

const getAllSales = async (req, res) => {
  try {
    const { user } = req;
    const sales = await saleService.getAllSales(user);
    res.status(OK).json(sales);
  } catch (error) {
    let code = NOTFOUND;
    if (error.message === NOTADMINISTRATOR.message) code = FORBIDDEN;
    res.status(code).json({ err: { message: error.message } });
  }
};

const updateSaleStatus = async (req, res) => {
  try {
    const { saleid } = req.params;
    const { status } = req.body;
    const { user } = req;
    const response = await saleService.updateSaleStatus(saleid, status, user);
    res.status(OK).json(response);
  } catch (error) {
    let code = BADREQUEST;
    if (error.message === NOTADMINISTRATOR.message) code = FORBIDDEN;
    if (error.message === SAMESTATUS.message) code = NOTMODIFIED;
    res.status(code).json({ err: { message: error.message } });
  }
};

const adminGetSaleById = async (req, res) => {
  try {
    const { saleid } = req.params;
    const { user } = req;
    const response = await saleService.adminGetSaleById(saleid, user);
    res.status(200).json(response);
  } catch (error) {
    res.status(FORBIDDEN).json({ err: { message: error.message } });
  }
};

module.exports = {
  createSale,
  getSaleByUserId,
  getSaleProducts,
  getAllSales,
  updateSaleStatus,
  adminGetSaleById,
};