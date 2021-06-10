module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      totalPrice: { type: Sequelize.DECIMAL },
      deliveryAddress: { type: Sequelize.STRING },
      deliveryNumber: { type: Sequelize.STRING },
      saleDate: { type: Sequelize.DATE },
      status: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', foreignKey: 'id' },
        onDelete: 'cascade',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
