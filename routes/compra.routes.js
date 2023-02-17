const { Router } = require('express');
const router = Router();
const CompraController = require('../controllers/compra.controller');
const { isLogged } = require('../middlewares/validaciones');
const { enviarMail } = require('../utils/enviarMail');

router.get('/', async (req, res) => {
  
  try {                
    let result = await CompraController.getAll();      
    return res.status(200).send(result);          
      
  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

router.get('/myCompras', async (req, res) => {
  
  //let { userId } = req.body;

  try {                    
    let compras = [];
    let misCompras = await CompraController.getMyCompras(req.user._id);          
    
    if(misCompras.result.length !== 0) {
      compras = misCompras.result;
    } 
    console.log(compras);

    res.render('compras.ejs', { title: 'My Cart', user: req.user, compras });

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

router.post('/', isLogged, async (req, res) => {

  let { cartId } = req.body;

  try {                
    let result = await CompraController.newCompra(req.user._id, cartId);      
    if(result.status === 'OK'){      
      mensaje = `<div><h2>Bienvenido/a</h2><p>Gracias por registrarte en Ecommerce Back, puedes visitar la tienda cuando gustes.</p><a href="#">www.tienda-back.com</a></div>`;
      enviarMail(req.user.email, 'Detalle de Compra', mensaje)      
    }

    return res.status(200).send(result);          
      
  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  } 
});

module.exports = router;
