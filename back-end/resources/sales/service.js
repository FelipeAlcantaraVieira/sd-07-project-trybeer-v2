const { sequelize, Sale, Product, SaleProduct } = require('../../models');
const { statusIsValid } = require('../../helpers/validations');
const { invalidData, statusUpdated } = require('../../helpers/dictonary');

const updateStatus = async (status, id) => {
  if (!statusIsValid(status)) return { error: true, message: invalidData };
  await Sale.update({ status }, { where: { id } });
  return { error: false, message: statusUpdated };
};

const getAll = async () => Sale.findAll();

const getAllByUserId = async (userId) => Sale.findAll({ where: { userId } });

const getSaleById = async (saleId) => (Sale.findByPk(saleId));

const getAllProductsBySaleId = async (salesId) => Sale.findByPk(salesId,
  {
    include:
    {
      model: Product,
      as: 'products',
      /* through: { attributes: [] }, */
    },
  });

const create = async (sale, products) => {
  const t = await sequelize.transaction();
  try {
    const newSale = await Sale
      .create({ ...sale,
        deliveryAddress: sale.street,
        deliveryNumber: sale.houseNumber,
        saleDate: Date.now(),
        status: 'Pendente' }, { transaction: t });
    await SaleProduct
      .bulkCreate(products
        .map(({ id, quantity }) => ({ saleId: newSale.id, productId: id, quantity })),
        { transaction: t });
    await t.commit();
  } catch (ForeignKeyConstraintError) {
    await t.rollback();
    console.error(ForeignKeyConstraintError.message);
    throw ForeignKeyConstraintError;
  }
};

module.exports = {
  getAll,
  getAllByUserId,
  getSaleById,
  getAllProductsBySaleId,
  updateStatus,
  create,
};
