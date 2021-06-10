const { Sale, Product, User, SalesProduct } = require('../models');
const {
  SAMESTATUS,
  NOTFOUNDID,
  NOEXISTENTPURCHASE,
  NOTADMINISTRATOR,
  NOEXISTENTSALE,
} = require('./errors/SaleMessages');
const { validateData, validateStatus } = require('./validations/SaleValidations');

const createSale = async (data, token) => {
  const validateArray = data.map((saleData) => validateData(saleData));
  const dataIsntValid = validateArray.some((item) => item.error);
  if (dataIsntValid === true)
    throw validateArray.find((error) => error.error).error.details[0];

  const totalProductPrice = await Promise.all(
    data.map(async ({ productName, quantity }) => {
      const product = await Product.findOne({ where: { name: productName } });
      const price = product.price * quantity;
      return Number(price);
    })
  );
  const userId = await User.findOne({ where: { email: token.email } });
  const totalSalePrice = totalProductPrice.reduce((acc, curr) => acc + curr);
  const { id } = userId;
  const { deliveryAddress, deliveryNumber } = data[0];
  const sale = await Sale.create({
    userId: id,
    totalPrice: totalSalePrice,
    deliveryAddress,
    deliveryNumber,
  });
  data.map(async ({ productName, quantity }) => {
    const product = await Product.findOne({ where: { name: productName } });
    SalesProduct.create({ saleId: sale.id, productId: product.id, quantity });
  });
};

const getSaleProducts = async (id, saleid) => {
  const sales = await Sale.findOne({where: {userId: id, saleid} });
  if (sales.length === 0) throw NOTFOUNDID;
  return sales;
};

const getSaleByUserId = async (id) => {
  const result = await Sale.findAll({where: { userId: id }});
  console.log(result);
  if (result === null) throw NOEXISTENTPURCHASE;
  const retorno = await Promise.all(
    result.map((sale) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const saleDate = sale.saleDate.toLocaleString('en-GB', options);
      return {
        saleId: sale.id,
        saleDate: saleDate.slice(0, 5),
        totalPrice: sale.totalPrice,
      };
    })
  );
  return retorno;
};

const getAllSales = async (token) => {
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  const sales = await Sale.findAll();
  if (sales === null) throw NOEXISTENTSALE;
  return sales;
};

const updateSaleStatus = async (id, status, token) => {
  const { error } = validateStatus(status);
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  if (error) throw error;
  const response = await Sale.update({ status }, { where: id });
  if (response[0] === 0) throw SAMESTATUS;
  return { message: `Pedido registrado como ${status}` };
};

const adminGetSaleById = async (saleId, token) => {
  if (token.role !== 'administrator') throw NOTADMINISTRATOR;
  const result = await Sale.findByPk(saleId);
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
