const db = require('../database');

// Créer une nouvelle commande et retourner son ID
exports.createEmptyOrder = (idClient, callback) => {
  const query = `
    INSERT INTO "ORDER" (dateOrder, idClient, idStatus) 
    VALUES (datetime('now'), ?, 1)
  `;
  db.run(query, [idClient], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
};

// Vérifier s'il existe une commande en attente pour un client
exports.getPendingOrderByClient = (idClient, callback) => {
  const query = `
    SELECT idOrder FROM "ORDER" 
    WHERE idClient = ? AND idStatus = 1 
    ORDER BY dateOrder DESC LIMIT 1
  `;
  db.get(query, [idClient], callback);
};

// Ajouter un article à une commande
exports.addItemToOrder = (idOrder, idDish, quantity, callback) => {
  const query = `
    INSERT INTO ORDER_LINE (idOrder, idDish, quantity) 
    VALUES (?, ?, ?)
    ON CONFLICT(idOrder, idDish) DO UPDATE SET quantity = quantity + excluded.quantity
  `;
  db.run(query, [idOrder, idDish, quantity], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

// Finaliser une commande
exports.finalizeOrder = (idOrder, callback) => {
  const query = `
    UPDATE "ORDER" 
    SET idStatus = 2 -- 3 = Livrée ou Finalisée
    WHERE idOrder = ?
  `;
  db.run(query, [idOrder], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

// Retirer un article du panier
exports.removeItemFromOrder = (idOrder, idDish, callback) => {
  const query = `
    DELETE FROM ORDER_LINE 
    WHERE idOrder = ? AND idDish = ?
  `;
  db.run(query, [idOrder, idDish], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};


// Ajuster la quantité d'un article dans une commande
exports.adjustItemQuantity = (idOrder, idDish, quantity, callback) => {
  if (quantity > 0) {
    // Réduire la quantité
    const query = `
      UPDATE ORDER_LINE
      SET quantity = quantity - ?
      WHERE idOrder = ? AND idDish = ? AND quantity >= ?
    `;
    db.run(query, [quantity, idOrder, idDish, quantity], function (err) {
      if (err) return callback(err);

      if (this.changes === 0) {
        return callback(null, { message: 'Item quantity not adjusted, check quantity value.' });
      }
      callback(null, { message: 'Item quantity adjusted successfully' });
    });
  } else {
    // Supprimer l'article si la quantité est à zéro
    const query = `
      DELETE FROM ORDER_LINE
      WHERE idOrder = ? AND idDish = ?
    `;
    db.run(query, [idOrder, idDish], function (err) {
      if (err) return callback(err);
      callback(null, { message: 'Item removed from the order' });
    });
  }
};

// Vérifier la quantité actuelle d'un article
exports.getItemQuantity = (idOrder, idDish, callback) => {
  const query = `
    SELECT quantity FROM ORDER_LINE 
    WHERE idOrder = ? AND idDish = ?
  `;
  db.get(query, [idOrder, idDish], callback);
};


exports.getOrderByClient = (idClient, callback) => {
  const query = `
    SELECT "ORDER".idOrder as id , SUM(OL.quantity * D.price )as totalPrice , SUM(OL.quantity) as quantity ,OS.statusName as status  FROM "ORDER" 
    INNER JOIN main.ORDER_LINE OL on "ORDER".idOrder = OL.idOrder
    INNER JOIN main.DISH D on D.idDish = OL.idDish               
    INNER JOIN main.ORDER_STATUS OS on OS.idStatus = "ORDER".idStatus
    WHERE idClient = ?
    GROUP BY "ORDER".idOrder , "ORDER".dateOrder
    ORDER BY "ORDER".dateOrder DESC

  `;
  db.all(query, [idClient], callback);
};

exports.getOrderLineById = (idOrder, callback) => {
    const query = `
        SELECT  D.* , quantity FROM "ORDER_LINE" 
        INNER JOIN main.DISH D on D.idDish = ORDER_LINE.idDish
        WHERE idOrder = ?
    `;
    db.all(query, [idOrder], callback);
}
