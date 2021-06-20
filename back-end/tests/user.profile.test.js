const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../index');
const { userNotFound, invalidData } = require('../helpers/dictonary');
const models = require('../models');

const user = {
  name: 'Roberto Carlos',
  email: 'zebirita@gmail.com',
};

const CONTENT_TYPE = 'Content-Type';

describe('User profile test', () => {
  afterAll((done) => {
    models.sequelize.close()
      .then(() => done());
  });

  it('Será validado que não é possível atualizar o nome com um email inválido', (done) => {
    request(app)
      .put('/profile')
      .send({
        name: user.name,
        email: '@gmail',
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(invalidData);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível atualizar o nome com um nome inválido', (done) => {
    request(app)
      .put('/profile')
      .send({
        name: 'Rogério!',
        email: user.email,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(invalidData);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que não é possível atualizar o nome de um usuário não registrado', (done) => {
    request(app)
      .put('/profile')
      .send({
        name: user.name,
        email: 'felipetestabackprofile@gmail.com',
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe(userNotFound);
        done();
      })
      .catch((err) => done(err));
  });

  it('Será validado que é possível atualizar o nome', async (done) => {
    request(app)
      .put('/profile')
      .send(user)
      .expect(StatusCodes.OK)
      .expect(CONTENT_TYPE, /json/)
      .then((res) => {
        expect(res.body.message).toBe('Atualização concluída com sucesso');
        models.User.update({ name: 'Cliente Zé Birita' }, { where: { email: user.email } })
        .then(() => done());
      })
      .catch((err) => done(err));
  });

  it('Será validado que é possível listar todos os usuários', (done) => {
        request(app)
          .get('/users')
          .expect(StatusCodes.OK)
          .expect(CONTENT_TYPE, /json/)
          .then(({ body }) => {
            expect(body[0]).toHaveProperty('name');
            expect(body[0]).toHaveProperty('email');
            expect(body[0]).toHaveProperty('password');
            expect(body[0]).toHaveProperty('role');
            done();
          })
          .catch((err) => done(err));
  });
});