const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const userCtrl = require('../controllers/user'); //Import of controller
const auth = require('../middleware/auth'); //import Middleware to authentification path
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/desactivate',userCtrl.desactivateAccount);
router.put('/update/:id',auth,multer,userCtrl.updateAccount);
router.get('/profil/:id',auth, userCtrl.seeAprofil);

module.exports = router;