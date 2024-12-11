const express = require('express');
const {
  getAllOrderLines,
  getOrderLinesByOrderId,
  createOrderLine,
  deleteOrderLineByOrderId,
  deleteOrderLine,
} = require('../controllers/orderLineController');

const router = express.Router();

// GET all order lines
router.get('/', getAllOrderLines);

// GET order lines by order ID
router.get('/:idOrder', getOrderLinesByOrderId);

// POST a new order line
router.post('/', createOrderLine);

// DELETE all order lines for a specific order
router.delete('/:idOrder', deleteOrderLineByOrderId);

// DELETE a specific order line (by order ID and dish ID)
router.delete('/:idOrder/:idDish', deleteOrderLine);

module.exports = router;
