const loginService = require('../services/LoginService.js');
const { OK, BADREQUEST } = require('./HttpCodes');

const getUser = async (req, res) => {
  try {
    const { body } = req;
    const data = await loginService.getUser(body);
    res.status(OK).json(data);
  } catch (error) {
    res.status(BADREQUEST).json({ err: { message: error.message } });
  }
};

module.exports = {
  getUser,
};