const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    text: { 
      type: String,
      required: true, 
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    attachment: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, collection: "messages" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
