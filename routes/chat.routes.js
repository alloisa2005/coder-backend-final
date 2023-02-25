
const { Router } = require('express');
const router = Router();
const ChatController = require('../controllers/chat.controller');

const { isLogged } = require('../middlewares/validaciones');

router.get('/', isLogged, (req, res) => {      
  res.render('chat.ejs', { title: 'Chat', user: req.user});  
});

router.get('/:id', ChatController.getUserMensajes)

module.exports = router;