const { Router } = require('express');
const CategoryController = require('../controllers/CategoryControllers');
var auth = require('../services/authentication');
var checkRole = require('../services/checkRoles');

const router = Router()
router.post('/add', auth.authenticateToken, checkRole.checkRole, CategoryController.add)
router.get('/pegarCategory', auth.authenticateToken, CategoryController.takeCategory)
router.patch('/updateCategory/:id', auth.authenticateToken, checkRole.checkRole, CategoryController.atualizaCategoria)



module.exports = router