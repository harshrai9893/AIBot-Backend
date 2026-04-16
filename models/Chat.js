const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  messages: [
    {
      text: String,
      sender: String, // "user" or "bot"
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);