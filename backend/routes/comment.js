const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const commentCtrl = require('../controllers/comment'); //Import of controller
const auth = require('../middleware/auth'); //import Middleware to authentification path
const multer = require('../middleware/multer-config');

router.post ('/createcomment', auth,multer, commentCtrl.createComment);
router.get ('/allcommentpost/:post_id', auth, commentCtrl.getAllComment);
router.get ('/allusercomment/:user_id', auth, commentCtrl.getAllUserComment);
router.get ('/onecomment/:id',auth, commentCtrl.getOneComment);
router.post ('/likecomment/:comment_id/:user_id',auth, commentCtrl.likeComment);
router.delete ('/dislikecomment/:id/:comment_id/:user_id', auth, commentCtrl.dislikeComment);
router.get ('/countcomment/:comment_id', commentCtrl.countLike);
router.put ('/updatecomment/:id',auth,multer, commentCtrl.updateOneComment);
router.put ('/deletecomment/:id',auth, commentCtrl.deleteOneComment);
module.exports = router;