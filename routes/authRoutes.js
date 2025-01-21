const express = require('express');
const { loginAccount, registerAccount , getProfil, updateProfil} = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginAccount);
router.post('/register', registerAccount);
router.put('/update/:id', updateProfil);
router.get('/:id', getProfil);

module.exports = router;
