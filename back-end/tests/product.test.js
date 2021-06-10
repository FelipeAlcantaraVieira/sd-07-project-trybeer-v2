const request = require('supertest');
const express = require('express');
const { product } = require('../routes');
const db = require('../models');
const message = require('./config/errorMessages');
const { contentType, applicationJson, tokens } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(product);

it('Não é deve ser possivel acessar a rota sem ter um token válido', (done) => 
  request(app)
    .get('/products')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(401, message.invalidToken, done));

it('É possivel acessar a rota com um token válido', (done) => 
  request(app)
    .get('/products')
    .set('Accept', applicationJson)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(200, done));

    afterAll(async () => {
      await db.sequelize.close();
    });