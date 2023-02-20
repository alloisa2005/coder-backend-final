
const UserModel = require('../models/User.model');

class UserController {

  async getAll(req, res) { 
    
    try {
      let usuarios = await UserModel.find().sort({ createdAt: -1});  
      return res.send({status: 'OK', usuarios});
    } catch (error) {
      return res.send({status: 'ERROR', msg: 'Error al intentar completar la petición'});
    }
  }
}

module.exports = new UserController();


/* try {      

  // Listo los productos ordenados por fecha de creación, 
  // los recién agregados aparecen al principio
  let result = await ProductModel.find().sort({createdAt: -1})
  return {status:'OK', result};
  

} catch (error) {

  return {status:'ERROR', result: error.message}; 
} */