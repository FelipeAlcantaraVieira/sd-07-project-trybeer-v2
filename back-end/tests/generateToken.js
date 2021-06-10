const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');

const EMAIL = 'user@test.com';
const generateToken = (type) => {
  if (type === 'admin') {
  const token = jwt.sign({ email: 'tryber@trybe.com.br', password: '123456' }, SECRET, jwtConfig);
  const data = { 
    token, 
    name: 'Tryber Admin', 
    email: 'tryber@trybe.com.br', 
    role: 'administrator', 
    id: 1 };
  return data;
}
if (type === 'invalid') {
  const token = jwt.sign({ email: EMAIL, password: 'errou' }, SECRET, jwtConfig);
const data = { token, name: 'testuser', email: EMAIL, role: 'client', id: 2 };
return data;
}
const token = jwt.sign({ email: EMAIL, password: 'test123' }, SECRET, jwtConfig);
const data = { token, name: 'testuser', email: EMAIL, role: 'client', id: 2 };
return data;
};

module.exports = { generateToken };