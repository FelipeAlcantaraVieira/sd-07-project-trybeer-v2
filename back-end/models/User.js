module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(20),
    role: DataTypes.STRING(20),
  },
  { timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.sale, { foreignKey: 'userId', as: 'sale' });
  };

  return User;
};
