const request = require('supertest');
const express = require('express');
const shell = require('shelljs');
const db = require('../models');
const { sale } = require('../routes');
const message = require('./config/errorMessages');
const { contentType, applicationJson, tokens } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(sale);

const salesUser = '/sales/users';
const adminRoute = '/sales/admin';
const updateRoute = '/sales/admin/1';

const validSale = [
  {
    productName: 'Skol Lata 250ml',
    quantity: 5,
    deliveryAddress: 'Teste',
  },
];
const { productName, quantity, deliveryAddress } = validSale[0];
const invalidQuantity = [{ productName, quantity: 0 }];
const invalidAddress = [{ productName, quantity, deliveryAddress: '' }];
const invalidDeliveryNumber = [
  { productName, quantity, deliveryAddress, deliveryNumber: '' },
];
const withoutName = [{}];
const withoutQuantity = [{ productName }];
const withoutAddress = [{ productName, quantity }];

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  shell.exec('npx sequelize db:seed:all');
});

it('Para consultar as vendas dos usuários deverá ser um administrador', (done) =>
  request(app)
    .get(updateRoute)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(403, message.notAdministrator, done));

it('Não é possivel cadastrar uma compra sem ter um token valido', (done) =>
  request(app)
    .post(salesUser)
    .send(validSale)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(401, message.invalidToken, done));

it('Não é possivel cadastrar uma compra com quantidade menor que 1', (done) =>
  request(app)
    .post(salesUser)
    .send(invalidQuantity)
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.errorInvalidQuantity, done));

it('Não é possivel cadastar uma compra sem o endereço', (done) =>
  request(app)
    .post(salesUser)
    .send(invalidAddress)
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.errorInvalidAddress, done));

it('Não é possivel cadastrar caso delivery number não seja numero', (done) =>
  request(app)
    .post(salesUser)
    .send(invalidDeliveryNumber)
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.errorInvalidDeliveryNumber, done));

it('Não é possivel cadastrar caso não tenha quantity', (done) =>
  request(app)
    .post(salesUser)
    .send(withoutQuantity)
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.quantityRequired, done));

it('Não é possivel cadastrar caso não tenha o deliveryAddress', (done) =>
  request(app)
    .post(salesUser)
    .send(withoutAddress)
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.addressRequired, done));

it('Não é possivel cadastrar caso não tenha o deliveryAddress', (done) =>
  request(app)
    .post(salesUser)
    .send(withoutName)
    .set(tokens.user)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, message.productNameRequired, done));

it('Não é possivel listar usuário sem compras', (done) =>
  request(app)
    .get(salesUser)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(404, done));

it('É retornada uma lista vazia quando não há nenhuma venda cadastrada.', (done) =>
  request(app)
    .get(adminRoute)
    .set(tokens.admin)
    .expect(contentType, /json/)
    .expect(404, message.emptySales, done));

it('Deve ser possivel cadastrar uma compra', (done) =>
  request(app)
    .post(salesUser)
    .send(validSale)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(201, message.createdSale, done));

it('Deve ser possível listar as compras realizadas', (done) =>
  request(app)
    .get(salesUser)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(200, done));

it('Deve ser possivel listar compras pelo id da compra', (done) =>
  request(app)
    .get('/sales/users/1')
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(200, done));

it('Não deve ser possivel listar uma compra pelo id que não pertença ao usuario', (done) =>
  request(app)
    .get('/sales/users/9999')
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(404, done));

it('Apenas o administrador pode consultar todas as vendas do banco', (done) =>
  request(app)
    .get(adminRoute)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(403, message.notAdministrator, done));

it('O administrador deve ter acesso a todas as vendas cadastradas.', (done) =>
  request(app)
    .get(adminRoute)
    .set(tokens.admin)
    .expect(contentType, /json/)
    .expect(200, done));

it('O administrador pode alterar o status de uma venda.', (done) =>
  request(app)
    .put(updateRoute)
    .send({ status: 'Entregue' })
    .set(tokens.admin)
    .expect(contentType, /json/)
    .expect(200, message.sucessChangeStatus, done));

it('Não deve ser possivel atualizar um status pelo mesmo status.', (done) =>
  request(app)
    .put(updateRoute)
    .send({ status: 'Entregue' })
    .set(tokens.admin)
    .expect(304, done));

it('O status da venda deve ser Pendente ou Entregue.', (done) =>
  request(app)
    .put(updateRoute)
    .send({ status: 'Xablau' })
    .set(tokens.admin)
    .expect(contentType, /json/)
    .expect(400, message.wrongStatus, done));

it('Para atualizar a venda o usuario deve ser um administrador', (done) =>
  request(app)
    .put(updateRoute)
    .set(tokens.user)
    .expect(contentType, /json/)
    .expect(403, message.notAdministrator, done));

it('O status da venda deve ser Pendente ou Entregue.', (done) =>
  request(app).get(updateRoute).set(tokens.admin).expect(200, done));

afterAll(async () => {
  await db.sequelize.close();
});
