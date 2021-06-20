const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../index');
const { service } = require('../resources/auth');
const models = require('../models');

const product = {
  id: 1,
  name: 'Skol Lata 250ml',
  price: '2.20',
  urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
};

const user = {
  email: 'zebirita@gmail.com',
  password: '12345678',
};

const getToken = () => service.login(user.email, user.password).then((res) => res.payload.token);

describe('Product Test', () => {
  afterAll((done) => {
    models.sequelize.close()
      .then(() => done());
  });
  it('Será validado que é possível listar todos os produtos', (done) => {
    getToken()
      .then((token) => {
        request(app)
          .get('/products')
          .set({ authorization: token })
          .expect(StatusCodes.OK)
          .expect('Content-Type', /json/)
          .then(({ body }) => {
            expect(body[0].id).toBe(product.id);
            expect(body[0].name).toBe(product.name);
            expect(body[0].price).toBe(product.price);
            expect(body[0].urlImage).toBe(product.urlImage);
            done();
          })
          .catch((err) => done(err));
      });
  });
});
