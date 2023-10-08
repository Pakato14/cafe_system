const { Router } = require('express')
const UserController = require('../controllers/UserControllers')

const router = Router()
router.get('/')
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/forgotPassword', UserController.forgot)
router.get('/allUser', UserController.pegaUser)


module.exports = router