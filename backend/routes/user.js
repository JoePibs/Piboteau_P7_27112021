const express = require('express') // need express
const router = express.Router() // Construction of router with express method
const userCtrl = require('../controllers/user') //Import of controller
const auth = require('../middleware/auth') //import Middleware to authentification path
const multer = require('../middleware/multer-config')

router.get('/me',auth, userCtrl.me)
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.put('/desactivate',auth, userCtrl.desactivateAccount)
router.get('/:id/desactivatebyadmin',auth, userCtrl.desactivateByAdmin)
router.put('/update', auth, userCtrl.updateAccount)
router.get('/:id/profil', auth, userCtrl.seeAprofil)
/*router.post('/:id/controlpassword', userCtrl.controlPassword)
router.put('/:id/updatepassword', auth, userCtrl.updatePassword)*/
router.get('/commentedby',auth, userCtrl.allPostUserHaveComment)

module.exports = router
