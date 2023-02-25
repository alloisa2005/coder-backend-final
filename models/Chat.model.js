const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user: {type: mongoose.Types.ObjectId, ref: 'User' },
    message: [{
      sender: { type: mongoose.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
    }],    
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Chat", chatSchema);