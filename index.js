require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session')
const flash = require('express-flash');
const passport = require('passport');
const compression = require('compression');
const { Server } = require('socket.io');

const app = express();

let PORT = process.env.PORT || 8080;

//////// Conexión MongoDB ////////
require('./database');

//////// Passport Local ////////
require('./passport/passportLocal');

//////////////////////// EJS //////////////////////////////
app.set('views', 'views');
app.set('view-engine', 'ejs');

//////////////////////// Middlewares //////////////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(flash());
app.use(session({      
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,  
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(compression());

////////////// Rutas //////////////  
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/productos', require('./routes/product.routes'));
app.use('/api/carrito', require('./routes/carrito.routes'));   
app.use('/', require('./routes/login.routes'));
app.use('/api/compras', require('./routes/compra.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

const servidor = app.listen(PORT, () => console.log(`Server Up on Port ${PORT}!!`));

const io = new Server(servidor)

