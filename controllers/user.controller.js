
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

  async getById(req, res) { 
    let { id } = req.params;

    try {
      let usuario = await UserModel.findById(id);
      return res.send({status: 'OK', usuario});
    } catch (error) {
      return res.send({status: 'ERROR', msg: 'Error al intentar completar la petición'});
    }
  }  

  async updateUser(req, res) { 
    let { id } = req.params;

    try {
      let usuario = await UserModel.findByIdAndUpdate(id, req.body, {new: true})

      if(!usuario) return res.status(400).send({status: 'OK', msg: 'Usuario no existe'});

      return res.send({status: 'OK', usuario});
    } catch (error) {
      return res.send({status: 'ERROR', msg: 'Error al intentar completar la petición'});
    }
  }  

  async createUser(req, res) {     

    try {
      let usuario = await UserModel.create(req.body);

      return res.send({status: 'OK', usuario});
    } catch (error) {
      return res.send({status: 'ERROR', msg: 'Error al intentar completar la petición'});
    }
  } 

  async deleteUser(req, res) {
    let { id } = req.params;

    try {
      let usuario = await UserModel.findByIdAndDelete(id)
      if(!usuario) return res.status(404).send( {status: 'ERROR', result: `No existe usuario ID: ${id}`} )

      return res.status(200).send({status: 'OK', usuario});
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