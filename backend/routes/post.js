const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const postCtrl = require('../controllers/post'); //Import of controller

router.get ('/', postCtrl.getAllPost);
router.get ('/onepost/:id', postCtrl.getOnePost);
router.get ('/userpost/:id', postCtrl.getAllUserPost);
router.post ('/createpost', postCtrl.createPost);

module.exports = router;