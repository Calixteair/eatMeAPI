const OrderLine = require('../models/orderLineModel');

exports.getAllOrderLines = (req, res) => {
  OrderLine.getAll((err, orderLines) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(orderLines);
    }
  });
};

exports.getOrderLinesByOrderId = (req, res) => {
  const idOrder = req.params.idOrder;
  OrderLine.getByOrderId(idOrder, (err, orderLines) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(orderLines);
    }
  });
};

exports.createOrderLine = (req, res) => {
  const newOrderLine = req.body;
  OrderLine.create(newOrderLine, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.id });
    }
  });
};

exports.deleteOrderLineByOrderId = (req, res) => {
  const idOrder = req.params.idOrder;
  OrderLine.deleteByOrderId(idOrder, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: 'No order lines found for this order' });
    } else {
      res.json({ message: 'Order lines deleted successfully' });
    }
  });
};

exports.deleteOrderLine = (req, res) => {
  const { idOrder, idDish } = req.params;
  OrderLine.delete(idOrder, idDish, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: 'Order line not found' });
    } else {
      res.json({ message: 'Order line deleted successfully' });
    }
  });
};
