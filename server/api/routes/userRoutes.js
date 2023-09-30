const { Router } = require('express')
const UserController = require('../controllers/UserControllers')

const router = Router()
router.get('/')
router.post('/signup', UserController.signUp)
router.get('/allUser', UserController.pegaUser)


module.exports = router