const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');

const EMAIL = 'zebirita@gmail.com';
const generateToken = (type) => {
  if (type === 'admin') {
  const token = jwt.sign({ email: 'tryber@trybe.com.br', password: '12345678' }, SECRET, jwtConfig);
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
const data = { token, name: 'Cliente Zé Birita', email: EMAIL, role: 'client', id: 2 };
return data;
}
const token = jwt.sign({ email: EMAIL, password: 12345678 }, SECRET, jwtConfig);
const data = { token, name: 'Cliente Zé Birita', email: EMAIL, role: 'client', id: 2 };
return data;
};

module.exports = { generateToken };