module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total_price: { type: Sequelize.DECIMAL(4, 2) },
      delivery_address: { type: Sequelize.STRING },
      delivery_number: { type: Sequelize.STRING },
      sale_date: { type: Sequelize.DATE },
      status: { type: Sequelize.STRING },
      user_id: {
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
