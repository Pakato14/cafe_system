const { Router } = require('express');
const DashboardController = require('../controllers/DashboardControllers')
var auth = require('../services/authentication');
var checkRole = require('../services/checkRoles');

const router = Router()
router.get('/details', auth.authenticateToken, DashboardController.details)



module.exports = router