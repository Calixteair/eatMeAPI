const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ajouter un article (création de commande si nécessaire)
router.post('/addItem', orderController.addItem);

// Finaliser une commande
router.post('/finalize', orderController.finalizeOrder);

// Ajuster la quantité d'un article ou le retirer si quantité <= 0
router.post('/adjustItem', orderController.adjustItemQuantity);

// Retirer un article d'une commande en cours
router.post('/removeItem', orderController.removeItem);


router.get('/client/:id', orderController.getOrderByIdClient);
router.get('/:id', orderController.getOrderById);


module.exports = router;
