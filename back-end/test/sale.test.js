const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../index');
const { service } = require('../resources/auth');
const models = require('../models');

const sale = {
  userId: 45,
  deliveryAddress: '1',
  deliveryNumber: '1',
  totalPrice: '22.50',
};
const products = [
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/Heineken 600ml.jpg',
    quantity: 3,
  },
];

const user = {
  email: 'zebirita@gmail.com',
  password: '12345678',
};

const getToken = () => service.login(user.email, user.password).then((res) => res.payload.token);

describe('Sale Test', () => {
  afterAll((done) => {
    models.sequelize.close()
      .then(() => done());
  });
  it('Será validado que é possível fazer criar uma venda', (done) => {
    getToken()
    .then((token) => {
      request(app)
      .post('/sales')
      .set({ authorization: token })
      .send({ sale, products })
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/);
      done();
    });
  });

  it('Será validado que é possível listar todas as vendas', (done) => {
    getToken()
      .then((token) => {
        request(app)
          .get('/sales')
          .set({ authorization: token })
          .expect(StatusCodes.OK)
          .expect('Content-Type', /json/)
          .then(({ body }) => {
            expect(body[0]).toHaveProperty('totalPrice');
            expect(body[0]).toHaveProperty('userId');
            expect(body[0]).toHaveProperty('deliveryAddress');
            expect(body[0]).toHaveProperty('deliveryNumber');
            done();
          })
          .catch((err) => done(err));
      });
  });
});
