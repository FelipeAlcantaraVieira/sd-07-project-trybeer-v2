const request = require('supertest');
const express = require('express');
const shell = require('shelljs');
const db = require('../models');
const { login } = require('../routes');
const message = require('./config/errorMessages');
const { contentType, applicationJson } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(login);

const invalidEmail = { email: 'test@test', password: '1234567' };
const emptyEmail = { email: '', password: '1234567' };
const emptyPassword = { email: 'test@teste.com', password: '' };
const passwordOnly = { password: '123456' };
const emailOnly = { email: 'tste@teste.com' };
const shortPassword = { email: 'tete@teste.com', password: '12345' };
const invalidUser = { email: 'invaliduser@invalid.com', password: 'invalidPassword' };
const validUser = { email: 'tryber@trybe.com.br', password: '12345678' };

beforeAll(async () => {
    shell.exec('npx sequelize-cli db:drop $');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

it('São retornados todos os usuários cadastrados', async (done) => {
    const result = await db.user.findAll({});
    const { name, email, password, role, id } = result[0];
    expect(result[0]).toMatchObject({ name, email, password, role, id });
    done();
});

it('Não é possível fazer login com um email inválido', (done) => request(app)
    .post('/login')
    .send(invalidEmail)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.emailMustBeValid, done));

it('Não é possível fazer login com um email em branco.', (done) => request(app)
    .post('/login')
    .send(emptyEmail)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.notAllowedEmptyEmail, done));

it('Não é possível fazer login com uma senha em branco.', (done) => request(app)
    .post('/login')
    .send(emptyPassword)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.notAllowedEmptyPassword, done));

it('Não é possível fazer login sem passar um email.', (done) => request(app)
    .post('/login')
    .send(passwordOnly)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.emailIsRequired, done));

it('Não é possível fazer login sem passar uma senha.', (done) => request(app)
    .post('/login')
    .send(emailOnly)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.passwordIsRequired, done));

it('Não é possível fazer login com uma senha menor que 6 caracteres.', (done) => request(app)
    .post('/login')
    .send(shortPassword)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.wrongPasswordLength, done));

it('Não é possível fazer login com um usuário não cadastrado.', (done) => request(app)
    .post('/login')
    .send(invalidUser)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.userNotRegistered, done));

it('Ao realizar login com sucesso deve ser retornado um objeto com token, name, email, role, id.',
  (done) => request(app)
    .post('/login')
    .send(validUser)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then(({ body }) => {
      const { token, name, email, role, id } = body;
      expect(body).toMatchObject({ token, name, email, role, id });
      done();
    }));

    afterAll(async () => {
        await db.sequelize.close();
      });