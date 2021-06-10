module.exports = (sequelize, _DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
    {
      quantity: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'sales_product'
    });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SaleProduct;
};