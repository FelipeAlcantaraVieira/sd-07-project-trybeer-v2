const request = require('supertest');
const express = require('express');
const db = require('../models');
const { sale } = require('../routes');
const message = require('./config/errorMessages');
const { contentType, applicationJson, tokens } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(sale);

const salesUser = '/sales/users';

it('Não é possivel logar utilizando um token invalido', (done) => request(app)
  .post(salesUser)
  .set(tokens.invalid)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(401, message.errorToken, done));

  afterAll(async () => {
    await db.sequelize.close();
  });