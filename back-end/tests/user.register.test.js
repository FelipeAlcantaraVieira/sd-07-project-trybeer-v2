const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
require('iconv-lite').encodingExists('foo');
const { app } = require('../index');
const { invalidData, userExists } = require('../helpers/dictonary');
const models = require('../models');

const user = {
  name: 'Roberto Carlos',
  email: 'felipetestabackregister@gmail.com',
  password: '12345678',
  role: 'client',
};

const registeredEmail = 'tryber@trybe.com.br';

const CONTENT_TYPE = 'Content-Type';

describe('User register test', () => {
  afterEach(() => {
    models.User.destroy({ where: { email: user.email } });
  });

  it('Será validado que não é possível se registrar com um email inválido', (done) => {
    request(app)
      .post('/register')
      .send({
        name: user.name,
        email: '@gmail',
        password: user.password,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(invalidData);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível se registrar com um nome inválido', (done) => {
    request(app)
      .post('/register')
      .send({
        name: 'Roberto Santos!',
        email: user.email,
        password: user.password,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(invalidData);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível se registrar com uma senha inválida', (done) => {
    request(app)
      .post('/register')
      .send({
        name: user.name,
        email: user.email,
        password: '123',
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(invalidData);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível se registrar com um email já registrado', (done) => {
    request(app)
      .post('/register')
      .send({
        name: user.name,
        email: registeredEmail,
        password: user.password,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(userExists);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que é possível se registrar', (done) => {
    request(app)
      .post('/register')
      .send(user)
      .expect(StatusCodes.CREATED)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe('usuário cadastrado com sucesso');
        done();
      })
      .catch((err) => done(err));
  });
});
