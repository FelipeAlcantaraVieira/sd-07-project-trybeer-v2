const { userService } = require('../services');
const { OK, CREATED, NOTMODIFIED, BADREQUEST } = require('./HttpCodes');
const { SAMEUSERNAME } = require('../services/errors/UserMessage');

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const userData = await userService.registerUser(data);
    res.status(CREATED).json(userData);
  } catch (error) {
    res.status(BADREQUEST).json({ err: { message: error.message } });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.user;
    const response = await userService.updateUser(name, email);
    res.status(OK).json(response);
  } catch (error) {
    if (error.message === SAMEUSERNAME.message) {
      return res.status(NOTMODIFIED).json({ err: { message: error.message } });
    }
    res.status(BADREQUEST).json({ err: { message: error.message } });
  }
};

module.exports = {
  createUser,
  updateUser,
};