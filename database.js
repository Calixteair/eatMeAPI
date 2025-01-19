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
                                          dateOfBirth TEXT
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
        ('Pâte', 'Des pâtes crémeuses', 11.50, 750, 25, 45, 'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg'),
        ('Sushi', 'Un assortiment de sushis frais', 15.99, 600, 40, 55, 'https://www.dailynews.com/wp-content/uploads/2020/12/SGT-L-DINE-SUSHIROLLS-1204-4-1.jpg'),
        ('Tacos', 'Des tacos savoureux', 9.99, 700, 30, 40, 'https://cdn.pixabay.com/photo/2023/08/08/08/46/tacos-8176774_1280.jpg'),
        ('Soupe', 'Une soupe chaude et réconfortante', 7.50, 400, 15, 25, 'https://cdn.pixabay.com/photo/2017/01/24/20/30/soup-2006317_1280.jpg'),
        ('Steak', 'Un steak juteux', 18.99, 900, 50, 10, 'https://cdn.pixabay.com/photo/2021/05/01/22/01/meat-6222139_1280.jpg'),
        ('Poulet rôti', 'Un poulet rôti tendre et savoureux', 14.50, 850, 45, 5, 'https://cdn.pixabay.com/photo/2018/08/13/13/37/roasted-chicken-3602956_1280.jpg'),
        ('Gaufre', 'Une gaufre sucrée et croustillante', 5.99, 400, 6, 50, 'https://cdn.pixabay.com/photo/2019/11/07/13/05/waffle-4608843_1280.jpg'),
        ('Crêpe', 'Une crêpe fine et moelleuse', 4.99, 350, 8, 45, 'https://cdn.pixabay.com/photo/2019/08/16/16/16/pancakes-4410605_1280.jpg'),
        ('Curry', 'Un curry épicé et aromatique', 13.50, 600, 30, 50, 'https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247_1280.jpg'),
        ('Wrap', 'Un wrap frais et léger', 8.50, 450, 20, 35, 'https://cdn.pixabay.com/photo/2021/03/24/08/49/durum-6119590_1280.jpg'),
        ('Paella', 'Une paella aux fruits de mer', 17.99, 750, 40, 60, 'https://cdn.pixabay.com/photo/2017/06/21/22/44/paella-2428945_1280.jpg'),
        ('Sandwich', 'Un sandwich garni', 9.50, 600, 25, 45, 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863_1280.jpg'),
        ('Donut', 'Un donut sucré au sucre', 2.99, 300, 4, 40, 'https://cdn.pixabay.com/photo/2017/04/04/16/41/cake-2201876_1280.jpg'),
        ('Ramen', 'Un bol de ramen chaud et savoureux', 13.99, 700, 30, 50, 'https://cdn.pixabay.com/photo/2022/05/10/18/50/ramen-7187810_1280.jpg');

    `);

    // Insertion dans CLIENT
    db.run(`
      INSERT INTO CLIENT (firstName, lastName, email, password, dateOfBirth)
      VALUES
        ('John', 'Doe', 'email1@mail.com', 'mdp', '1990-01-01'),
        ('Jane', 'Doe', 'email2@mail.com', 'mdp', '1995-01-01'),
        ('Alice', 'Smith', 'email3@mail.com', 'mdp', '1985-06-15'),
        ('Bob', 'Brown', 'email4@mail.com', 'mdp', '2000-12-10');
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
