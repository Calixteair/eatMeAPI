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
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS ORDER_LINE`);
    db.run(`DROP TABLE IF EXISTS "ORDER"`);
    db.run(`DROP TABLE IF EXISTS ORDER_STATUS`);
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
                                          email TEXT UNIQUE NOT NULL,
                                          password TEXT NOT NULL,
                                          dateOfBirth TEXT,
                                          extraNapkins INTEGER DEFAULT 0,
                                          frequentRefill INTEGER DEFAULT 0
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS ORDER_STATUS (
                                                idStatus INTEGER PRIMARY KEY AUTOINCREMENT,
                                                statusName TEXT NOT NULL UNIQUE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS "ORDER" (
                                           idOrder INTEGER PRIMARY KEY AUTOINCREMENT,
                                           dateOrder TEXT NOT NULL,
                                           idClient INTEGER NOT NULL,
                                           idStatus INTEGER NOT NULL DEFAULT 1,
                                           FOREIGN KEY (idClient) REFERENCES CLIENT(idClient),
                                           FOREIGN KEY (idStatus) REFERENCES ORDER_STATUS(idStatus)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS ORDER_LINE (
                                              idOrder INTEGER NOT NULL,
                                              idDish INTEGER NOT NULL,
                                              quantity INTEGER NOT NULL DEFAULT 1,
                                              PRIMARY KEY (idOrder, idDish),
                                              FOREIGN KEY (idOrder) REFERENCES "ORDER"(idOrder),
                                              FOREIGN KEY (idDish) REFERENCES DISH(idDish)
      )
    `);

    // Insertion dans ORDER_STATUS
    db.run(`
      INSERT INTO ORDER_STATUS (statusName) VALUES
                                              ('en cours'),
                                              ('validée');
    `);

    // Insertion dans DISH
    db.run(`
      INSERT INTO DISH (name, description, price, calories, proteins, carbs, imageURL)
      VALUES
        ('Burger', 'Un délicieux burger', 10.99, 800, 35, 50, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg'),
        ('Pizza', 'Une délicieuse pizza', 12.99, 1000, 45, 60, 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg'),
        ('Salade', 'Une délicieuse salade', 8.99, 500, 20, 30, 'https://production-media.gousto.co.uk/cms/mood-image/2236_American-Corn-Salad-With-Ranch-Dressing_0561-1588586763860.jpg'),
        ('Smoothie', 'Un délicieux smoothie', 6.99, 300, 10, 20, 'https://images-na.ssl-images-amazon.com/images/I/71s7s4d6KcL.jpg'),
        ('Pasta', 'Des pâtes crémeuses', 11.50, 750, 25, 45, 'https://cdn.pixabay.com/photo/2018/07/11/08/23/pasta-3531524_960_720.jpg'),
        ('Sushi', 'Un assortiment de sushis frais', 15.99, 600, 40, 55, 'https://cdn.pixabay.com/photo/2017/06/29/18/30/sushi-2455981_960_720.jpg');
    `);

    // Insertion dans CLIENT
    db.run(`
      INSERT INTO CLIENT (firstName, lastName, email, password, dateOfBirth, extraNapkins, frequentRefill)
      VALUES
        ('John', 'Doe', 'email1@mail.com', 'mdp', '1990-01-01', 1, 0),
        ('Jane', 'Doe', 'email2@mail.com', 'mdp', '1995-01-01', 0, 1),
        ('Alice', 'Smith', 'email3@mail.com', 'mdp', '1985-06-15', 1, 1),
        ('Bob', 'Brown', 'email4@mail.com', 'mdp', '2000-12-10', 0, 0);
    `);

    // Insertion dans "ORDER"
    db.run(`
      INSERT INTO "ORDER" (dateOrder, idClient, idStatus)
      VALUES
        ('2024-01-01', 1, 1),
        ('2024-01-02', 2, 2),
        ('2024-01-03', 3, 1),
        ('2024-01-04', 4, 1),
        ('2024-01-05', 1, 2);
    `);

    // Insertion dans ORDER_LINE
    db.run(`
      INSERT INTO ORDER_LINE (idOrder, idDish, quantity)
      VALUES
        (1, 1, 2),
        (1, 3, 1),
        (2, 2, 1),
        (2, 4, 2),
        (3, 5, 1),
        (3, 6, 1),
        (4, 1, 3),
        (4, 2, 2),
        (5, 4, 1),
        (5, 3, 2);
    `);
  });
}

module.exports = db;
