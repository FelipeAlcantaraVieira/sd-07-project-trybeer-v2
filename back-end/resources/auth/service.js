const User = require('../user');
const {
  validations: { emailIsValid, passwordIsValid },
  token: { generateToken },
} = require('../../helpers');
const { userNotFound, emailOrPasswordInvalid } = require('../../helpers/dictonary');

const validateLogin = async (email, password) => {
  if (!emailIsValid(email) || !passwordIsValid(password)) {
    return {
      error: true,
      message: emailOrPasswordInvalid,
    };
  }
  const [user] = await User.service.getByEmail(email);
  if (!user) {
    return { error: true, message: userNotFound };
  }
  if (user.password !== password) {
    return { error: true, message: emailOrPasswordInvalid };
  }
  return { error: false, user };
};

const login = async (userEmail, password) => {
  const { error, message, user } = await validateLogin(userEmail, password);
  if (error) return { error, message };
  const token = generateToken(user);

  const { email, name, role, id } = user;
  return { error: false, payload: { token, name, email, role, id } };
};

module.exports = { login };
