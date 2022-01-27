const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const imageCtrl = require('../controllers/upload'); //Import of controller
const multer = require('../middleware/multer-config'); // import multer configuration
const auth = require('../middleware/auth')
router.post('/',multer, imageCtrl.upload);

module.exports = router;