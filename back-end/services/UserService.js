const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');
const { User } = require('../models');
const { validateUserData, validadeUserName } = require('./validations/UserValidations');
const { REGISTEREDEMAIL, SAMEUSERNAME } = require('./errors/UserMessage');

const registerUser = async (data) => {
  const { error } = validateUserData(data);
  if (error) throw error;
  const { name, email, role, password } = data;
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) throw REGISTEREDEMAIL;
  const newUser = await User.create(data);
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return { token, name, email, role, id: newUser.insertId };
};

const updateUser = async (name, email) => {
  const { error } = validadeUserName({ name });
  if (error) throw error;
  console.log(`Console do email: ${email}`);
  const response = await User.update({ name },{ where: { email } });
  console.log(response);
  if (response[0] === 0) throw SAMEUSERNAME;
  return { message: 'Atualização concluída com sucesso' };
};

module.exports = {
  registerUser,
  updateUser,
};