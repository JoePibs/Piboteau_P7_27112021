const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const commentCtrl = require('../controllers/comment'); //Import of controller

router.post ('/createcomment', commentCtrl.createComment);
router.get ('/allcommentpost/:post_id', commentCtrl.getAllComment);
router.get ('/allusercomment/:user_id', commentCtrl.getAllUserComment);
router.get ('/onecomment/:id', commentCtrl.getOneComment);
router.put ('/updatecomment/:id',commentCtrl.updateOneComment)
module.exports = router;