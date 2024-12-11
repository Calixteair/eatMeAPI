const db = require('../database');

const Order = {
  getAll: (callback) => {
    const query = 'SELECT * FROM `ORDER`';
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM `ORDER` WHERE idOrder = ?';
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  },

  create: (order, callback) => {
    const query = `
      INSERT INTO \`ORDER\` (dateOrder, totalPrice, idClient)
      VALUES (?, ?, ?)
    `;
    const params = [
      order.dateOrder,
      order.totalPrice,
      order.idClient,
    ];
    db.run(query, params, function (err) {
      callback(err, { id: this.lastID });
    });
  },

  update: (id, order, callback) => {
    const query = `
      UPDATE \`ORDER\`
      SET dateOrder = ?, totalPrice = ?, idClient = ?
      WHERE idOrder = ?
    `;
    const params = [
      order.dateOrder,
      order.totalPrice,
      order.idClient,
      id,
    ];
    db.run(query, params, function (err) {
      callback(err, { changes: this.changes });
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM `ORDER` WHERE idOrder = ?';
    db.run(query, [id], function (err) {
      callback(err, { changes: this.changes });
    });
  },
};

module.exports = Order;
