const express = require('express');
// const authMiddleware = require('../../middlewares/authMiddleware');
const { getAll, create, update } = require('./controller');

const router = express.Router();

router.get('/users', getAll);
router.post('/register', create);
router.put('/profile', update);

module.exports = router;
