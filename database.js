const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Create tables if they don't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS DISH (
      idDish INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      calories INTEGER,
      proteins REAL,
      carbs REAL,
      imageURL TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS CLIENT (
      idClient INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      dateOfBirth TEXT,
      extraNapkins INTEGER DEFAULT 0,
      frequentRefill INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "ORDER" (
      idOrder INTEGER PRIMARY KEY AUTOINCREMENT,
      dateOrder TEXT NOT NULL,
      totalPrice REAL NOT NULL,
      idClient INTEGER NOT NULL,
      FOREIGN KEY (idClient) REFERENCES CLIENT(idClient)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ORDER_LINE (
      idOrder INTEGER NOT NULL,
      idDish INTEGER NOT NULL,
      PRIMARY KEY (idOrder, idDish),
      FOREIGN KEY (idOrder) REFERENCES "ORDER"(idOrder),
      FOREIGN KEY (idDish) REFERENCES DISH(idDish)
    )
  `);
}

module.exports = db;
