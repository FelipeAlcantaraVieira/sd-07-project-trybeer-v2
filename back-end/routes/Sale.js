const express = require('express');
const cors = require('cors');
const { saleController } = require('../controllers');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const router = express.Router();
router.use(cors());

router.route('/sales/users')
  .post(validateTokenMiddleware, saleController.createSale)
  .get(validateTokenMiddleware, saleController.getSaleByUserId);

router.route('/sales/users/:saleid')
  .get(validateTokenMiddleware, saleController.getSaleProducts);
  
router.route('/sales/admin')
  .get(validateTokenMiddleware, saleController.getAllSales);

router.route('/sales/admin/:saleid')
  .put(validateTokenMiddleware, saleController.updateSaleStatus)
  .get(validateTokenMiddleware, saleController.adminGetSaleById);

module.exports = router;