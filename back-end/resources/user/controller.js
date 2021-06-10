const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const getAll = async (_req, res) => {
  try {
    const users = await service.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { error, message } = await service.create(name, email, password, role);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error, message });
    res.status(StatusCodes.CREATED).json({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { error, message } = await service.update(name, email);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error, message });
    res.status(StatusCodes.OK).json({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { getAll, create, update };
