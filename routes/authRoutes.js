const express = require('express');
const { loginAccount, registerAccount } = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginAccount);
router.post('/register', registerAccount);

module.exports = router;
