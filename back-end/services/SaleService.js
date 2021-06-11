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
  const sales = await sale.findAll({ where: { userId: id, id: saleid }, 
    include: [{ model: product, as: 'products' }] });
  if (sales.length === 0) throw NOTFOUNDID;
  return sales;
};
// sale = [{
//   name,
//   quantity,
//   price,
// }]
const getSaleByUserId = async (id) => {
  const result = await sale.findAll({ where: { userId: id } });
  if (result === null) throw NOEXISTENTPURCHASE;
  const retorno = await Promise.all(
    result.map((newSale) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const saleDate = newSale.saleDate.toLocaleString('en-GB', options);
      return {
        saleId: newSale.id,
        saleDate: saleDate.slice(0, 5),
        totalPrice: newSale.totalPrice,
        status: newSale.status,
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
  const response = await sale.update({ status }, { where: { id } });
  if (response[0] === 0) throw SAMESTATUS;
  return { message: `Pedido registrado como ${status}` };
};

const adminGetSaleById = async (saleId, token) => {
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  const result = await sale.findAll({ where: { id: saleId },
    include: [{ model: product, as: 'products' }] });
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
