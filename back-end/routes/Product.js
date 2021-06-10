const express = require('express');
const cors = require('cors');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const { productsController } = require('../controllers');

const router = express.Router();
router.use(cors());

router.route('/products')
  .get([cors(), validateTokenMiddleware], productsController.getAllProducts);

module.exports = router;