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
  // Créer les tables dans le bon ordre
  db.serialize(() => {

    db.run(`DROP TABLE IF EXISTS ORDER_LINE`);
    db.run(`DROP TABLE IF EXISTS "ORDER"`);
    db.run(`DROP TABLE IF EXISTS CLIENT`);
    db.run(`DROP TABLE IF EXISTS DISH`);


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
        password TEXT NOT NULL,
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

    // Insérer des données après avoir créé les tables
    db.run(`
      INSERT INTO DISH (name, description, price, calories, proteins, carbs, imageURL)
      VALUES 
        ('Burger', 'Un délicieux burger', 10.99, 800, 35, 50, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg'),
        ('Pizza', 'Une délicieuse pizza', 12.99, 1000, 45, 60, 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg'),
        ('Salade', 'Une délicieuse salade', 8.99, 500, 20, 30, 'https://production-media.gousto.co.uk/cms/mood-image/2236_American-Corn-Salad-With-Ranch-Dressing_0561-1588586763860.jpg'),
        ('Power Rade', 'Un délicieux smoothie', 6.99, 300, 10, 20, 'https://images-na.ssl-images-amazon.com/images/I/71s7s4d6KcL.jpg');
    `);

    db.run(`
      INSERT INTO CLIENT (firstName, lastName, email, password, dateOfBirth, extraNapkins, frequentRefill)
      VALUES 
        ('John', 'Doe', 'email1@mail.com', 'mdp', '1990-01-01', 1, 0),
        ('Jane', 'Doe', 'email2@mail.com', 'mdp', '1995-01-01', 0, 1);
    `);
  });
}

module.exports = db;
