
const { Router } = require('express');
const router = Router();
const { isLogged } = require('../middlewares/validaciones');

router.get('/', isLogged, (req, res) => {
  let io = req.app.get('socketio');

  console.log(req.user);
  
  res.render('chat.ejs', { title: 'Chat', user: req.user});

  io.on('connection', socket => {
    
    // cuando se conecta un nuevo usuario
    socket.on('message', data => {    
      console.log(data);
    })
  })
});

module.exports = router;