const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/product.controller');

////////////////  LOGGER///////////////
const { logger_info } = require('../logs/files/log_config');

// Middlewares
const { validarInputsProduct, isLogged, isAdmin } = require('../middlewares/validaciones')


 router.get('/', isLogged, async (req, res) => {
  try {    
    
    logger_info.info(`Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida - Email: ${req.user.email} - User: ${req.user.nombre}`);  

    let result = await ProductController.getAll()
    
    return res.status(200).send(result);          

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  }  
}); 

router.get('/name/:cadena', async (req, res) => {
  try {        
    let { cadena } = req.params;
    let result = await ProductController.getLikeName(cadena);
    
    return res.status(200).send(result);          

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  }  
});

router.get('/detail/:id_prod', isLogged, async (req, res) => {
  
  let { id_prod } = req.params;
  try {
    let producto = await ProductController.getById({_id: id_prod});      
    
    res.render('productDetail.ejs', { title: 'Product Detail', user: req.user, producto: producto.result });
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:id', async (req, res) => {  
  let { id } = req.params;
  try {    
      
    let result = await ProductController.getById(id);
    return res.status(200).send(result);

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  }  
});

router.post('/', isLogged, isAdmin, validarInputsProduct, async (req, res) => {

  try {    
      
    let result = await ProductController.createProduct(req.body);
    return res.status(200).send(result);    

  } catch (error) {
    return res.status(404).send({status:'ERROR', result: error.message}); 
  }

});

router.put('/:id', isLogged, isAdmin, validarInputsProduct, async (req, res) => {
  let { id } = req.params;            
  try {
       
    let result = await ProductController.editProduct(id, req.body)
    return res.status(200).send(result);         

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  }
})

router.delete('/:id', isLogged, isAdmin, async (req, res) => {
  let { id } = req.params;            

  try {
    
    let result = await ProductController.deleteProduct(id);
    return res.status(200).send(result);            

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  }
})

module.exports = router;


