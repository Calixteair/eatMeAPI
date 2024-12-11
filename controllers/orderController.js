const Order = require('../models/orderModel');

exports.getAllOrders = (req, res) => {
  Order.getAll((err, orders) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(orders);
    }
  });
};

exports.getOrderById = (req, res) => {
  const id = req.params.id;
  Order.getById(id, (err, order) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(order);
    }
  });
};

exports.createOrder = (req, res) => {
  const newOrder = req.body;
  Order.create(newOrder, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.id });
    }
  });
};

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const updatedOrder = req.body;
  Order.update(id, updatedOrder, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ message: 'Order updated successfully' });
    }
  });
};

exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  Order.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  });
};
