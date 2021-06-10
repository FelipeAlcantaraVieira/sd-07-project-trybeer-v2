module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale',
    {
      totalPrice: { type: DataTypes.DECIMAL },
      deliveryAddress: { type: DataTypes.STRING },
      deliveryNumber: { type: DataTypes.STRING },
      saleDate: { type: DataTypes.DATE },
      status: DataTypes.STRING,
    },
    { timestamps: false, tableName: 'sales', underscored: true });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
  };

  return Sale;
};