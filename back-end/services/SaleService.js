const { sale, product, user, salesProduct } = require('../models');
const {
  SAMESTATUS,
  NOTFOUNDID,
  NOEXISTENTPURCHASE,
  NOTADMINISTRATOR,
  NOEXISTENTSALE,
} = require('./errors/SaleMessages');
const { validateData, validateStatus } = require('./validations/SaleValidations');

const getTotalValue = async (data) => {
  const teste = await Promise.all(
    data.map(async ({ productName, quantity }) => {
      const newProduct = await product.findOne({ where: { name: productName } });
      const price = newProduct.price * quantity;
      return Number(price);
    }),
  );
  return teste;
};
const createSale = async (data, token) => {
  const validateArray = data.map((saleData) => validateData(saleData));
  const dataIsntValid = validateArray.some((item) => item.error);
  if (dataIsntValid === true) throw validateArray.find((error) => error.error).error.details[0];
  const totalProductPrice = await getTotalValue(data);
  console.log(token);
  const { id } = await user.findOne({ where: { email: token.email } });
  const totalSalePrice = totalProductPrice.reduce((acc, curr) => acc + curr);
  const { deliveryAddress, deliveryNumber } = data[0];
  const newSale = await sale
    .create({ userId: id, totalPrice: totalSalePrice, deliveryAddress, deliveryNumber });
  data.map(async ({ productName, quantity }) => {
    const newProduct = await product.findOne({ where: { name: productName } });
    salesProduct.create({ saleId: newSale.id, productId: newProduct.id, quantity });
  });
};

const getSaleProducts = async (id, saleid) => {
  const sales = await sale.findOne({ where: { userId: id, saleid } });
  if (sales.length === 0) throw NOTFOUNDID;
  return sales;
};

const getSaleByUserId = async (id) => {
  const result = await sale.findAll({ where: { userId: id } });
  console.log(result);
  if (result === null) throw NOEXISTENTPURCHASE;
  const retorno = await Promise.all(
    result.map((newSale) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const saleDate = newSale.saleDate.toLocaleString('en-GB', options);
      return {
        saleId: newSale.id,
        saleDate: saleDate.slice(0, 5),
        totalPrice: newSale.totalPrice,
      };
    }),
  );
  return retorno;
};

const getAllSales = async (token) => {
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  const sales = await sale.findAll();
  if (sales === null) throw NOEXISTENTSALE;
  return sales;
};

const updateSaleStatus = async (id, status, token) => {
  const { error } = validateStatus(status);
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  if (error) throw error;
  const response = await sale.update({ status }, { where: id });
  if (response[0] === 0) throw SAMESTATUS;
  return { message: `Pedido registrado como ${status}` };
};

const adminGetSaleById = async (saleId, token) => {
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  const result = await sale.findByPk(saleId);
  return result;
};

module.exports = {
  createSale,
  getSaleByUserId,
  getSaleProducts,
  getAllSales,
  updateSaleStatus,
  adminGetSaleById,
};
