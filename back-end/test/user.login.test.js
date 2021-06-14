const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../index');
const { userNotFound, emailOrPasswordInvalid } = require('../helpers/dictonary');
const models = require('../models');

const user = {
  email: 'tryber@trybe.com.br',
  password: '123456',
};

const CONTENT_TYPE = 'Content-Type';

describe('Login test', () => {
  afterAll((done) => {
    models.sequelize.close()
      .then(() => done());
  });

  it('Será validado que não é possível fazer login com um email inválido', (done) => {
    request(app)
      .post('/login')
      .send({
        email: '@gmail',
        password: user.password,
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toContain(emailOrPasswordInvalid);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que o campo "email" é obrigatório', (done) => {
    request(app)
      .post('/login')
      .send({ password: user.password })
      .expect(StatusCodes.UNAUTHORIZED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toContain(emailOrPasswordInvalid);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que o campo "password" é obrigatório', (done) => {
    request(app)
      .post('/login')
      .send({ email: user.email })
      .expect(StatusCodes.UNAUTHORIZED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toContain(emailOrPasswordInvalid);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível fazer login com uma senha inválida', async (done) => {
    request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123',
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toContain(emailOrPasswordInvalid);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível fazer login com um email não registrado', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'felipaotestaback@gmail.com',
        password: user.password,
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toContain(userNotFound);
        done();
      })
      .catch((err) => done(err));
  });

  it('Should be able to login', async (done) => {
    request(app)
      .post('/login')
      .send(user)
      .expect(StatusCodes.OK)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(typeof res.body.token).toBe('string');
        done();
      })
      .catch((err) => done(err));
  });
});
