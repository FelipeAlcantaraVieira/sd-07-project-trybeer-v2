const express = require('express');

const route = express.Router();

const { findAllMessages } = require('./controller');

route.get('/message', findAllMessages);

module.exports = route;