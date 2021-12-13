const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const postCtrl = require('../controllers/post'); //Import of controller
const auth = require('../middleware/auth'); //import Middleware to authentification path
const multer = require('../middleware/multer-config'); // import multer configuration

router.get ('/', postCtrl.getAllPost);
router.get ('/onepost/:id',auth, postCtrl.getOnePost);
router.get ('/userpost/:id',auth, postCtrl.getAllUserPost);
router.post ('/createpost',auth,multer, postCtrl.createPost);
router.post ('/likepost/:post_id/:user_id',auth, postCtrl.likePost);
router.delete ('/dislikepost/:id/:post_id/:user_id',auth, postCtrl.dislikePost);
router.get ('/countpost/:post_id',auth, postCtrl.countLike);
router.put ('/updatepost/:id',auth,multer,postCtrl.updateOnePost);
router.put ('/deletepost/:id',auth,postCtrl.deleteOnePost);
//router.get ('/postliked/',auth,postCtrl.allPostUserLike);
module.exports = router;