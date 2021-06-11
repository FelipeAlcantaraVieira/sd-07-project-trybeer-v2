const { generateToken } = require('../generateToken');

const users = {
  tryberAdmin: {
    name: 'Tryber Admin',
    email: 'tryber@trybe.com.br',
    password: '12345678',
    role: 'administrator',
  },
  newUser: {
    name: 'New User Test',
    email: 'new@user.com',
    password: '123456',
    role: 'administrator',
  },
};

const contentType = 'Content-Type';
const applicationJson = 'application/json';

const userToken = generateToken();
const adminToken = generateToken('admin');
const invalidToken = generateToken('invalid');

const tokens = {
  user: { authorization: userToken.token, applicationJson },
  admin: { authorization: adminToken.token, applicationJson },
  invalid: { authorization: invalidToken.token, applicationJson },
};

module.exports = {
  users,
  applicationJson,
  contentType,
  tokens,
};
