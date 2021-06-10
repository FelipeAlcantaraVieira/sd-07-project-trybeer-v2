module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING(50), defaultValue: 'Pendente' },
  },
  { timestamps: false, underscored: true });
  Sale.associate = (models) => {
    Sale.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
  };
  return Sale;
};