
const CompraModel = require('../models/Compra.model');
const CartModel = require('../models/Cart.model');
const { enviarMail } = require('../utils/enviarMail');

class CompraController {

  async getAll(req, res) {

    try {
      let compras = await CompraModel.find().populate('user').populate('cart')
      return res.status(200).send(compras);  

    } catch (error) {
      return res.status(400).send( {status:'ERROR', result: error.message} );  
    }
  }  

  async getMyCompras(userId) {

    try {

      let result = await CompraModel.find({user: userId}).populate('cart')
      return {status:'OK', result};             

    } catch (error) {

      return {status:'ERROR', result: error.message};             
    }
  } 

  async newCompra (req, res) {

    let { cartId } = req.body;    

    try {                      
      let compra = new CompraModel({user: req.user._id, cart: cartId});
      await compra.save();
      await CartModel.findByIdAndUpdate(cartId, {activo: false});

      let newCompra = await CompraModel.findById(compra._id).populate('user'); 

      //Finalizo el carrito cambiando activo a FALSE      
      if(newCompra){      
        await CartModel.findByIdAndUpdate(cartId, {activo: false});
        let mensaje = `<div><h2>Bienvenido/a</h2><p>Gracias por registrarte en Ecommerce Back, puedes visitar la tienda cuando gustes.</p><a href="#">www.tienda-back.com</a></div>`;
        enviarMail(req.user.email, 'Detalle de Compra', mensaje)      
      }            
      return res.status(200).send({status: 'OK', result: newCompra});          
        
    } catch (error) {
      res.status(404).send({status:'ERROR', result: error.message}); 
    } 
  } 

  async getEntreFechas (req, res) {
    let { desde, hasta } = req.query;
    try {
      let fch_desde = new Date(desde).toLocaleDateString(`fr-CA`).split('/').join('-');      
      let fch_hasta = new Date(hasta).toLocaleDateString(`fr-CA`).split('/').join('-');            

      let compras = await CompraModel.find({createdAt: {
        $gte: `${fch_desde}T00:00:00.000Z`,
        $lte: `${fch_hasta}T23:59:59.999Z`
      }}).populate('user').populate('cart');

      res.status(200).send({status:'OK', compras}); 

    } catch (error) {
      res.status(404).send({status:'ERROR', result: error.message}); 
    }
  }
}

module.exports = new CompraController();