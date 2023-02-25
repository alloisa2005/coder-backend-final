const mongoose = require('mongoose');
const ChatModel = require('../models/Chat.model')


class ChatController {

  async getAllMensajes(req, res) {        

    try {      
      let result = await ChatModel.find()            
      return res.status(200).send({status:'OK', result }); 

    } catch (error) {
      return {status:'ERROR', result: error.message};
    }
  }
  
  async getUserMensajes(req, res) {        

    let { userId } = req.params;

    try {      
      let result = await ChatModel.find({user: userId});            
      return res.status(200).send({status:'OK', result }); 

    } catch (error) {
      return {status:'ERROR', result: error.message};
    }
  }

}

module.exports = new ChatController();