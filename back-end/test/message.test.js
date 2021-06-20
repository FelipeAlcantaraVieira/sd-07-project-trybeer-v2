const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../index');

describe('Message Test', () => {
  it('Será validado que é possível listar todas as conversas e mensagens', (done) => {
    request(app)
      .get('/message')
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/)
      .then(({ body }) => {
        expect(body[0]).toHaveProperty('client');
        expect(body[0]).toHaveProperty('timeLastMessage');
        expect(body[0]).toHaveProperty('messages');
        done();
      })
      .catch((err) => done(err));
  });
});
