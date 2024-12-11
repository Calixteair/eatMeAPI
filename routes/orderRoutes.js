const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

// GET all orders
router.get('/', getAllOrders);

// GET a single order by ID
router.get('/:id', getOrderById);

// POST a new order
router.post('/', createOrder);

// PUT (update) an existing order
router.put('/:id', updateOrder);

// DELETE an order
router.delete('/:id', deleteOrder);

module.exports = router;
