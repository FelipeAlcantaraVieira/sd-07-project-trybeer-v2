const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const { app } = require('../index');
const { userNotFound, emailOrPasswordInvalid } = require('../helpers/dictonary');
const models = require('../models');

const user = {
  email: 'tryber@trybe.com.br',
  password: '12345678',
};

const CONTENT_TYPE = 'Content-Type';

describe('User login test', () => {
  afterAll((done) => {
    done();
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
        expect(res.body.message).toBe(emailOrPasswordInvalid);
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
        expect(res.body.message).toBe(emailOrPasswordInvalid);
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
        expect(res.body.message).toBe(emailOrPasswordInvalid);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível fazer login com uma senha inválida', (done) => {
    request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123',
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(emailOrPasswordInvalid);
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
        expect(res.body.message).toBe(userNotFound);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que é possível fazer login', (done) => {
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
