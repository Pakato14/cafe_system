const { Router } = require('express')
const UserController = require('../controllers/UserControllers')

const router = Router()
router.get('/')
router.get('/allUser', UserController.pegaUser)


module.exports = router