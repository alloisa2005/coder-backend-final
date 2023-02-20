const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const { isLogged, isAdmin } = require('../middlewares/validaciones');

router.get('/', isLogged, isAdmin, userController.getAll);

module.exports = router;