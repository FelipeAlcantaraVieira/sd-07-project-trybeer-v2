const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const { app } = require('../index');
const { service } = require('../resources/auth');
const models = require('../models');
const { invalidData, statusUpdated } = require('../helpers/dictonary');

const adminOrderUrl = '/admin/orders/2';

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

const admin = {
  email: 'tryber@trybe.com.br',
  password: '12345678',
};

const getToken = ({ email, password }) =>
  service.login(email, password).then((res) => res.payload.token);

const CONTENT_TYPE = 'Content-Type';

describe('Sale Test', () => {
  afterAll((done) => {
    done();
  });
  it('Será validado que é possível fazer criar uma venda', (done) => {
    getToken(user)
      .then((token) => {
        request(app)
          .post('/sales')
          .set({ authorization: token })
          .send({ sale, products })
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/);
        done();
      });
  });

  it('Será validado que é possível listar todas as vendas', (done) => {
    getToken(user)
      .then((token) => {
        request(app)
          .get('/sales')
          .set({ authorization: token })
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/)
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

  it('Será validado que é possível listar todas as vendas de um cliente', (done) => {
    getToken(user)
      .then((token) => {
        request(app)
          .get('/sales/user/2')
          .set({ authorization: token })
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/)
          .then(({ body }) => {
            expect(body[0]).toHaveProperty('totalPrice');
            expect(body[0]).toHaveProperty('userId');
            expect(body[0]).toHaveProperty('deliveryAddress');
            expect(body[0]).toHaveProperty('deliveryNumber');
            expect(body[0]).toHaveProperty('status');
            done();
          })
          .catch((err) => done(err));
      });
  });

  it('Será validado que é possível listar uma venda específica(client)', (done) => {
    getToken(user)
      .then((token) => {
        request(app)
          .get('/sales/order/2')
          .set({ authorization: token })
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/)
          .then(({ body }) => {
            expect(body).toHaveProperty('totalPrice');
            expect(body).toHaveProperty('userId');
            expect(body).toHaveProperty('deliveryAddress');
            expect(body).toHaveProperty('deliveryNumber');
            done();
          })
          .catch((err) => done(err));
      });
  });

  it('Será validado que é possível listar uma venda específica(admin)', (done) => {
    getToken(user)
      .then((token) => {
        request(app)
          .get(adminOrderUrl)
          .set({ authorization: token })
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/)
          .then(({ body }) => {
            expect(body).toHaveProperty('totalPrice');
            expect(body).toHaveProperty('userId');
            expect(body).toHaveProperty('deliveryAddress');
            expect(body).toHaveProperty('deliveryNumber');
            expect(body).toHaveProperty('products');
            done();
          })
          .catch((err) => done(err));
      });
  });

  it('Será validado que não é possível atualizar uma venda com um status inválido', (done) => {
    getToken(admin)
      .then((token) => {
        request(app)
          .put(adminOrderUrl)
          .set({ authorization: token })
          .send({ status: 'pamonha' })
          .expect(StatusCodes.BAD_REQUEST)
          .expect(CONTENT_TYPE, /json/)
          .then((res) => {
            expect(res.body.message).toBe(invalidData);
            models.Sale.update({ status: 'Pendente' }, { where: { id: 1 } });
            done();
          })
          .catch((err) => done(err));
      });
  });
  it('Será validado que o admin é capaz de atualizar o status de uma venda', (done) => {
    getToken(admin)
      .then((token) => {
        request(app)
          .put(adminOrderUrl)
          .set({ authorization: token })
          .send({ status: 'Entregue' })
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/)
          .then((res) => {
            expect(res.body.message).toBe(statusUpdated);
            models.Sale.update({ status: 'Pendente' }, { where: { id: 1 } });
            done();
          })
          .catch((err) => done(err));
      });
  });
});
