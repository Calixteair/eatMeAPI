const db = require('../database');

const Dish = {
  getAll: (callback) => {
    const query = 'SELECT * FROM DISH';
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },
  create: (dish, callback) => {
    const query = `
      INSERT INTO DISH (name, description, price, calories, proteins, carbs, imageURL)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [dish.name, dish.description, dish.price, dish.calories, dish.proteins, dish.carbs, dish.imageURL];
    db.run(query, params, function (err) {
      callback(err, { id: this.lastID });
    });
  },
};

module.exports = Dish;
