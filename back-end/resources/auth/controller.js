const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error, message, payload } = await service.login(email, password);

    if (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message });
    }
    res.status(StatusCodes.OK).json({ ...payload });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

module.exports = { login };
