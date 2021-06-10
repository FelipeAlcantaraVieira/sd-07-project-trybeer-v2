const Joi = require('joi');
const { INVALIDUSER } = require('../errors/LoginMessages');
const { User } = require('../../models');

const validateLogin = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data);

const validUser = async (email, password) => {
  const userData = await User.findOne({ where: { email, password }});
  if (!userData) throw INVALIDUSER;
};

module.exports = {
  validateLogin,
  validUser,
};