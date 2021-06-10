module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale',
    {
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    { timestamps: false });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Sale;
};