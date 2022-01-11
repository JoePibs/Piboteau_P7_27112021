const express = require('express') // need express
const router = express.Router() // Construction of router with express method
const userCtrl = require('../controllers/user') //Import of controller
const auth = require('../middleware/auth') //import Middleware to authentification path
const multer = require('../middleware/multer-config')

router.get('/me',auth, userCtrl.me)
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.put('/:id/desactivate',auth, userCtrl.desactivateAccount)
router.put('/:id/update', auth, multer, userCtrl.updateAccount)
router.get('/:id/profil', auth, userCtrl.seeAprofil)
router.post('/:id/controlpassword', userCtrl.controlPassword)
router.put('/:id/updatepassword', auth, userCtrl.updatePassword)
router.get('/:id/commentedby',auth, userCtrl.allPostUserHaveComment)

module.exports = router
