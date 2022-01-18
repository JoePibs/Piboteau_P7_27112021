const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const commentCtrl = require('../controllers/comment'); //Import of controller
const auth = require('../middleware/auth'); //import Middleware to authentification path


router.post ('/:post_id/createcomment', auth, commentCtrl.createComment);
router.get ('/:post_id/allcommentpost', auth, commentCtrl.getAllComment);
router.get ('/:user_id/allusercomment', auth, commentCtrl.getAllUserComment);
router.get ('/:id/onecomment',auth, commentCtrl.getOneComment);
router.post (':comment_id/like/',auth, commentCtrl.likeComment);
router.delete (':comment_id/dislikecomment/', auth, commentCtrl.dislikeComment);
router.get ('/:comment_id/countcomment', commentCtrl.countLike);
router.put ('/:id/updatecomment',auth, commentCtrl.updateOneComment);
router.put ('/:id/deletecomment',auth, commentCtrl.deleteOneComment);
module.exports = router;