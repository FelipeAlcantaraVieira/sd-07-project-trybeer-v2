module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    'salesProduct',
    { quantity: DataTypes.STRING(10) },
    { timestamps: false, tableName: 'sales_products', underscored: true },
  );

  SalesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, { as: 'products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.product.belongsToMany(models.sale, { as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  return SalesProduct;
};
