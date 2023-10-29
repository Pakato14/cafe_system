const { Router } = require('express');
const UserController = require('../controllers/UserControllers');
var auth = require('../services/authentication');
var checkRole = require('../services/checkRoles');

const router = Router()
router.get('/')
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/forgotPassword', UserController.forgot)
router.get('/allUser', auth.authenticateToken, checkRole.checkRole, UserController.pegaUser)
router.patch('/update/:id', auth.authenticateToken, checkRole.checkRole, UserController.update)
router.get('/checkToken', auth.authenticateToken, UserController.checkToken)
router.post('/changePassword', UserController.changePassword)


module.exports = router