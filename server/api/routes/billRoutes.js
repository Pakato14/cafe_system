const { Router } = require('express');
const ProductController = require('../controllers/ProductControllers');
var auth = require('../services/authentication');
var checkRole = require('../services/checkRoles');

const router = Router()
router.post('/addProduct', auth.authenticateToken, checkRole.checkRole, ProductController.addProduct)
router.get('/pegarProduct', auth.authenticateToken, ProductController.takeProduct)
router.get('/pegarPorCategoria/:id', auth.authenticateToken, ProductController.takeByCategory)
router.get('/productById/:id', auth.authenticateToken, ProductController.takeById)
router.patch('/updateProduct/:id', auth.authenticateToken, checkRole.checkRole, ProductController.atualizaProduto)
router.delete('/deleteProduct/:id', auth.authenticateToken, ProductController.deleteProduct)



module.exports = router