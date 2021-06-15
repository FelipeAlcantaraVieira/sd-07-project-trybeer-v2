const { generateToken } = require('../../../../back-end/tests/generateToken');

const users = {
  tryberAdmin: {
    name: 'Tryber Admin',
    email: 'tryber@trybe.com.br',
    password: '12345678',
    role: 'administrator',
  },
  newUser: {
    name: 'Designer Front End',
    email: 'super@designer.com',
    password: 'criativo',
    role: 'administrator',
  },
};

const userToken = generateToken();
const adminToken = generateToken('admin');
const invalidToken = generateToken('invalid');

const tokens = {
  user: { authorization: userToken.token },
  admin: { authorization: adminToken.token },
  invalid: { authorization: invalidToken.token },
};

module.exports = {
  users,
  tokens,
};
