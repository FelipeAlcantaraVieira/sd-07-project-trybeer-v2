module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
    }),
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
