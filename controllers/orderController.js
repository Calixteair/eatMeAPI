const Order = require('../models/orderModel');

// Ajouter un article à une commande (création si nécessaire)
exports.addItem = (req, res) => {
  const { idClient, idDish, quantity } = req.body;

  if (!idClient || !idDish || !quantity ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Vérifier si une commande en attente existe
    Order.getPendingOrderByClient(idClient, (err, order) => {

      console.log("[ADD ITEM] Order : ", order , " idClient : ", idClient);

        if (err) {
        return res.status(500).json({ error: err.message });
        }

        if (!order) {
        // Créer une commande vide
        Order.createEmptyOrder(idClient, (err, result) => {
            if (err) {
            return res.status(500).json({ error: err.message });
            }

            const idOrder = result.id;

            // Ajouter l'article à la commande
            Order.addItemToOrder(idOrder, idDish, quantity, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Item added to the order', orderId: idOrder });
            });
        });
        } else {
        const idOrder = order.idOrder;

        // Ajouter l'article à la commande
        Order.addItemToOrder(idOrder, idDish, quantity, (err, result) => {
            if (err) {
            return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Item added to the order', orderId: idOrder });
        });
        }
    });

};

// Finaliser une commande
exports.finalizeOrder = (req, res) => {
  const { idOrder } = req.body;

  if (!idOrder) {
    return res.status(400).json({ error: 'Missing required fields: idOrder' });
  }

  Order.finalizeOrder(idOrder, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found or already finalized' });
    }
    res.json({ message: 'Order finalized successfully' });
  });
};


// Retirer un article d'une commande
exports.removeItem = (req, res) => {
  const { idClient, idDish } = req.body;

  if (!idClient || !idDish) {
    return res.status(400).json({ error: 'Missing required fields: idClient, idDish' });
  }

  // Vérifier s'il existe une commande en attente pour le client
  Order.getPendingOrderByClient(idClient, (err, order) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!order) {
      return res.status(404).json({ error: 'No active order found for this client' });
    }

    const orderId = order.idOrder;

    // Retirer l'article spécifique
    Order.removeItemFromOrder(orderId, idDish, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Item not found in the order' });
      }
      res.json({ message: 'Item removed from the order', orderId: orderId });
    });
  });
};

// Ajuster la quantité ou retirer un article d'une commande
exports.adjustItemQuantity = (req, res) => {
  const { idClient, idDish, quantity } = req.body;

  if (!idClient || !idDish || quantity === undefined) {
    return res.status(400).json({ error: 'Missing required fields: idClient, idDish, quantity' });
  }

  // Vérifier s'il existe une commande en attente pour le client
    Order.getPendingOrderByClient(idClient, (err, order) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }

        if (!order) {
        return res.status(404).json({ error: 'No active order found for this client' });
        }

        const orderId = order.idOrder;

        // Ajuster la quantité
        Order.adjustItemQuantity(orderId, idDish, quantity, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.message) {
            return res.status(400).json({ error: result.message });
        }
        res.json({ message: 'Item quantity adjusted successfully', orderId: orderId });
        });
    });
};





exports.getOrderByIdClient = (req, res) => {
    const id = req.params.id;
  console.log('[GET] Liste des commandes récupérée par ID client :', id);

  Order.getOrderByClient(id, (err, order) => {
        if (err) {
          console.log('Erreur lors de la récupération des commandes par ID client.');
          console.log(err);
        res.status(500).json({ error: err.message });
        } else if (!order) {
            console.log('Aucune commande trouvée pour cet ID client.');
          res.json([]);

        } else {
          console.log('[GET] Liste des commandes récupérée avec succès.');
          console.log(order);
        res.json(order);
        }
    });

}


exports.getOrderById = (req, res) => {
    const id = req.params.id;
    Order.getOrderLineById(id, (err, order) => {
        if (err) {
        res.status(500).json({ error: err.message });
        } else if (!order) {
        res.status(404).json({ error: 'Order not found' });
        } else {
        res.json(order);
        }
    });
};