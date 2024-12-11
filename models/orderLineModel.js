const db = require('../database');

const OrderLine = {
  getAll: (callback) => {
    const query = 'SELECT * FROM ORDER_LINE';
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },

  getByOrderId: (idOrder, callback) => {
    const query = 'SELECT * FROM ORDER_LINE WHERE idOrder = ?';
    db.all(query, [idOrder], (err, rows) => {
      callback(err, rows);
    });
  },

  create: (orderLine, callback) => {
    const query = `
      INSERT INTO ORDER_LINE (idOrder, idDish)
      VALUES (?, ?)
    `;
    const params = [orderLine.idOrder, orderLine.idDish];
    db.run(query, params, function (err) {
      callback(err, { id: this.lastID });
    });
  },

  deleteByOrderId: (idOrder, callback) => {
    const query = 'DELETE FROM ORDER_LINE WHERE idOrder = ?';
    db.run(query, [idOrder], function (err) {
      callback(err, { changes: this.changes });
    });
  },

  delete: (idOrder, idDish, callback) => {
    const query = 'DELETE FROM ORDER_LINE WHERE idOrder = ? AND idDish = ?';
    db.run(query, [idOrder, idDish], function (err) {
      callback(err, { changes: this.changes });
    });
  },
};

module.exports = OrderLine;
