const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    sender: {type: mongoose.Types.ObjectId, ref: 'User' },    
    receiver: {type: mongoose.Types.ObjectId, ref: 'User' },
    mensaje: {type:String, required: true}    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);