const { Router } = require('express');
const router = Router();
const chatController = require('../controllers/chat.controller');
const { isLogged } = require('../middlewares/validaciones');


router.get('/', isLogged, (req,res) => {
  res.render('chat.ejs', { title: 'Chat Page', user: req.user } )
});


module.exports = router;