const jwt = require('jsonwebtoken');
const { user } = require('../models');
const { SECRET } = require('../config/jwt');
require('dotenv').config();

const ERROR = { message: 'Invalid token' };
const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { email, password } = jwt.verify(token, SECRET);
    const userFound = await user.findOne({ where: { email, password } });
    if (await userFound === null) throw ERROR;
    req.user = userFound;

    next();
  } catch (err) {
    return res.status(401).json({ err: { message: err.message } });
  }
};

module.exports = validateTokenMiddleware;