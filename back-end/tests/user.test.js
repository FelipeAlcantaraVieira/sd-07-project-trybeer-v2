const request = require('supertest');
const express = require('express');
const shell = require('shelljs');
const { user } = require('../routes');
const db = require('../models');
const message = require('./config/errorMessages');
const { users, contentType, applicationJson, tokens } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(user);

const validName = 'Joao Siqueira da Silva';
const validEmail = 'teste@teste.com';
const validPassword = '1234567';
const validRole = 'client';

beforeAll(async () => {
  shell.exec('npx sequelize-cli db:drop $');
  shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  shell.exec('npx sequelize-cli db:seed:all $');
});

it('Não é possível cadastrar um usuário sem o campo name', (done) =>
  request(app)
    .post('/user')
    .send({})
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.nameRequired, done));

it('Não é possível cadastrar um usuário sem o campo email', (done) =>
  request(app)
    .post('/user')
    .send({ name: validName })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.emailRequired, done));

it('Não é possível cadastrar um usuário sem o campo password', (done) =>
  request(app)
    .post('/user')
    .send({ name: validName, email: validEmail })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.passwordIsRequired, done));

it('Não é possível cadastrar um usuário sem o campo role', (done) =>
  request(app)
    .post('/user')
    .send({ name: validName, email: validEmail, password: validPassword })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.roleIsRequired, done));

it('Não é possível cadastrar um com usuário o campo name contendo numeros ou simbulos', (done) =>
  request(app)
    .post('/user')
    .send({
      name: 'Joao Amaral 1940',
      email: validEmail,
      password: validPassword,
      role: validRole,
    })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, /fails to match the required pattern/, done));

it('Não é possível cadastrar um com usuário o campo name menor que 12 caracteres', (done) =>
  request(app)
    .post('/user')
    .send({ name: 'Joao', email: validEmail, password: validPassword, role: validRole })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.invalidNameLength, done));

it('Não é possível cadastrar um usuário com o campo email inválido', (done) =>
  request(app)
    .post('/user')
    .send({
      name: validName,
      email: 'teste@teste',
      password: validPassword,
      role: validRole,
    })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.invalidEmailType, done));

it('Não é possível cadastrar um usuário com uma senha menor que 6 caracteres', (done) =>
  request(app)
    .post('/user')
    .send({ name: validName, email: validEmail, password: '1234', role: validRole })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.invalidPasswordLength, done));

it('Não é possível cadastrar um usuário que a role não seja administrator ou client', (done) =>
  request(app)
    .post('/user')
    .send({ name: validName, email: validEmail, password: validPassword, role: 'outro' })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.invalidRoleName, done));

it('Não é possível cadastrar um email que já existe no banco', (done) =>
  request(app)
    .post('/user')
    .send(users.tryberAdmin)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.emailTaken, done));

it(' É possível cadastrar um novo usuario', (done) =>
  request(app)
    .post('/user')
    .send(users.newUser)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(201)
    .then(({ body }) => {
      const { token, name, email, role } = body;
      expect(body).toMatchObject({ token, name, email, role });
      done();
    }));

it('Não é possível atualizar o nome do usuario sem um token valido.', (done) =>
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo Nome' })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(401, /jwt must be provided/, done));

it('Deve ser possivel atualizar o nome do usuario.', (done) =>
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo Usuario' })
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200, done));

it('Caso seja o mesmo nome, o usuario não deve ser atualizado.', (done) =>
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo Usuario' })
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(304, done));

it('O nome do usuario não pode conter numeros ou caracteres especiais.', (done) =>
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo 1' })
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, /fails to match the required pattern/, done));

afterAll(async () => {
  await db.sequelize.close();
});
