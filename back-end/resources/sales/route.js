const express = require('express');
const {
  getAll,
  getAllByUserId,
  getAllProductsBySaleId,
  getSaleById,
  updateStatus,
  create,
} = require('./controller');

const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin/orders/:id', getAllProductsBySaleId);
router.put('/admin/orders/:id', updateStatus);
router.get('/sales', authMiddleware, getAll);
router.get('/sales/user/:id', authMiddleware, getAllByUserId);
router.get('/sales/order/:id', authMiddleware, getSaleById);
router.get('/sales/:id', authMiddleware, getAllProductsBySaleId);
router.post('/sales', authMiddleware, create);

module.exports = router;
