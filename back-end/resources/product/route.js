const express = require('express');
const path = require('path');
const { getAll } = require('./controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/products', authMiddleware, getAll);

router.use('/images', express.static(path.resolve(`${__dirname}/../../../images`)));

module.exports = router;