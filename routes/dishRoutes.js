const express = require('express');
const { getAllDishes, createDish } = require('../controllers/dishController');

const router = express.Router();

router.get('/', getAllDishes);
router.post('/', createDish);

module.exports = router;
