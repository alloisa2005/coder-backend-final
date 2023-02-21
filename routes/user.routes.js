const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const { isLogged, isAdmin } = require('../middlewares/validaciones');

router.get('/', isLogged, isAdmin, userController.getAll);

router.get('/:id', isLogged, isAdmin, userController.getById);

router.post('/', isLogged, isAdmin, userController.createUser);

router.put('/:id', isLogged, isAdmin, userController.updateUser);


module.exports = router;