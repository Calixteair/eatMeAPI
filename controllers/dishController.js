const Dish = require('../models/dishModel');

exports.getAllDishes = (req, res) => {
  Dish.getAll((err, dishes) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log(dishes);
      res.json(dishes);
    }
  });
};

exports.createDish = (req, res) => {
  const newDish = req.body;
  Dish.create(newDish, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.id });
    }
  });
};
