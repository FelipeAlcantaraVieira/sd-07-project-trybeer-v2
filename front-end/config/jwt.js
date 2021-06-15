const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const SECRET = 'vanessa';
module.exports = {
  jwtConfig,
  SECRET,
};
