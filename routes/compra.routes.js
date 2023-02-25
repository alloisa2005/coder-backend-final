const { Router } = require('express');
const router = Router();
const CompraController = require('../controllers/compra.controller');
const { isLogged, isAdmin } = require('../middlewares/validaciones');


router.get('/', CompraController.getAll);

router.get('/:id', CompraController.getCompraById);

router.get('/busqueda/fechas', CompraController.getEntreFechas);

router.get('/myCompras', async (req, res) => {    

  console.log(req.user);
  /* try {                    
    let compras = [];
    let misCompras = await CompraController.getMyCompras(req.user._id);          
    
    if(misCompras.result.length !== 0) {
      compras = misCompras.result;
    }     

    res.render('compras.ejs', { title: 'My Cart', user: req.user, compras });

  } catch (error) {
    res.status(404).send({status:'ERROR', result: error.message}); 
  }  */
});

router.post('/', isLogged, CompraController.newCompra);

module.exports = router;
