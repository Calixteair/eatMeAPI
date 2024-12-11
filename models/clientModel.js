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
      INSERT INTO CLIENT (firstName, lastName, email, dateOfBirth, extraNapkins, frequentRefill)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      client.firstName,
      client.lastName,
      client.email,
      client.dateOfBirth,
      client.extraNapkins || 0,
      client.frequentRefill || 0,
    ];
    db.run(query, params, function (err) {
      callback(err, { id: this.lastID });
    });
  },

  update: (id, client, callback) => {
    const query = `
      UPDATE CLIENT
      SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, extraNapkins = ?, frequentRefill = ?
      WHERE idClient = ?
    `;
    const params = [
      client.firstName,
      client.lastName,
      client.email,
      client.dateOfBirth,
      client.extraNapkins || 0,
      client.frequentRefill || 0,
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
