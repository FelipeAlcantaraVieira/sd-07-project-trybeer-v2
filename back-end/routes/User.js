const express = require('express');
const cors = require('cors');
const { userController } = require('../controllers');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const router = express.Router();
router.use(cors());

router.route('/user')
  .post(userController.createUser)
  .put(validateTokenMiddleware, userController.updateUser);

module.exports = router;