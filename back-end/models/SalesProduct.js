module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    'SalesProduct',
    {
      quantity: DataTypes.STRING(10),
    },
    {
      timestamps: false,
      tableName: 'Sales_Products',
      underscored: true
    }
  );

  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'Products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'Sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  return SalesProduct;
};
