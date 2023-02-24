const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user: {type: mongoose.Types.ObjectId, ref: 'User' },
    message: [{type: String }],    
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Chat", chatSchema);