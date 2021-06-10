const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || 'development';
const { secret } = require('../config/config')[env];

const generateToken = ({ name, email, role, id }) => {
  const payload = {
    name,
    email,
    role,
    id,
  };

  return jwt.sign(payload, secret);
};

const tokenIsValid = (token) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateToken,
  tokenIsValid,
};