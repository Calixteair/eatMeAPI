const db = require('../database');

const Client = {
  getAll: (callback) => {
    const query = 'SELECT * FROM CLIENT';
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM CLIENT WHERE idClient = ?';
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  },

  create: (client, callback) => {
    const query = `
      INSERT INTO CLIENT (firstName, lastName, email,password, dateOfBirth)
      VALUES (?, ?,?, ?, ?)
    `;
    const params = [
      client.first_name,
      client.last_name,
      client.email,
      client.password || 'mdp',
      client.date_of_birth,
    ];
    db.run(query, params, function (err) {
      callback(err, { id: this.lastID });
    });
  },

  update: (id, client, callback) => {
    const query = `
      UPDATE CLIENT
      SET firstName = ?, lastName = ?, password = ? , email = ?, dateOfBirth = ?
      WHERE idClient = ?
    `;
    const params = [
      client.first_name,
      client.last_name,
      client.email,
      client.date_of_birth,
      client.password || 'mdp',
      id,
    ];
    db.run(query, params, function (err) {
      callback(err, { changes: this.changes });
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM CLIENT WHERE idClient = ?';
    db.run(query, [id], function (err) {
      callback(err, { changes: this.changes });
    });
  },
};

module.exports = Client;
