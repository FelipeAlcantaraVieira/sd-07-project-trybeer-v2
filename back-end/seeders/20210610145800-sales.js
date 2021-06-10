'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: '1',
        total_price: 4.40,
        delivery_address: 'rua qualquer',
        delivery_number: '101',
        sale_date: new Date(),
        status: 'Pendente',
        user_id: '2'
      },
      {
        id: '2',
        total_price: 15.00,
        delivery_address: 'rua qualquer 2',
        delivery_number: '102',
        sale_date: new Date(),
        status: 'Pendente',
        user_id: '2'
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
