const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const postCtrl = require('../controllers/post'); //Import of controller
const auth = require('../middleware/auth'); //import Middleware to authentification path
const multer = require('../middleware/multer-config'); // import multer configuration

router.get ('/',auth, postCtrl.getAllPost);
router.get ('/:id/onepost',auth, postCtrl.getOnePost);
router.get ('/userposts/',auth, postCtrl.getAllUserPost);
router.post ('/createpost',auth,multer, postCtrl.createPost);
router.get ('/:post_id/like',auth, postCtrl.likePost);
router.get ('/:post_id/countLikes',auth, postCtrl.countLike);
router.put ('/:id/deletepost/',auth,postCtrl.deleteOnePost);
router.get ('/mostcommented/',auth,postCtrl.mostCommentPost);
router.get('/:post_id/likedby',auth,postCtrl.likedby)

module.exports = router;