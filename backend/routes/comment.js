const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const commentCtrl = require('../controllers/comment'); //Import of controller
const auth = require('../middleware/auth'); //import Middleware to authentification path


router.post ('/:post_id/createcomment', auth, commentCtrl.createComment);
router.get ('/:post_id/allcommentpost', auth, commentCtrl.getAllComment);
router.get ('/:user_id/allusercomment', auth, commentCtrl.getAllUserComment);
router.get ('/:id/onecomment',auth, commentCtrl.getOneComment);
router.put ('/:id/deletecomment',auth, commentCtrl.deleteOneComment);
module.exports = router;