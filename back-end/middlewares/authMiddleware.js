const { StatusCodes } = require('http-status-codes');
const { token: { tokenIsValid } } = require('../helpers');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (token === undefined) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    if (tokenIsValid(token)) {
        return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED).send();
};

module.exports = authMiddleware;