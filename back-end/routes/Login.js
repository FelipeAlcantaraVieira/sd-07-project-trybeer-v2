const express = require('express');
const cors = require('cors');
const loginController = require('../controllers/LoginController.js');

const router = express.Router();

router.use(cors());

router.route('/login')
  .post(cors(), loginController.getUser);

module.exports = router;