module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4, 2),
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING(200),
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
     return queryInterface.dropTable('products');
  },
};
