const express = require('express');
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public route
router.post('/', createOrder);

// Admin routes
router.get('/', protect, getAllOrders);
router.get('/:id', protect, getOrder);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
