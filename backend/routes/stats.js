const express = require('express'); // need express
const router = express.Router(); // Construction of router with express method 
const statsCtrl = require('../controllers/stats'); //Import of controller

router.get('/member', statsCtrl.memberCount);
router.get('/post', statsCtrl.postCount);
router.get('/comment', statsCtrl.commentCount);

module.exports = router;
