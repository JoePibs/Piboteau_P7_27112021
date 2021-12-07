const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const userCtrl = require('../controllers/user'); //Import of controller

router.post('/signup', userCtrl.signup);

module.exports = router;