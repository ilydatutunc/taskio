const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: false, // Takım konuşmaları için opsiyonel olabilir
    },
    messages: [
      {
        text: {
          type: String,
          required: true,
        },
        messageType: {
          type: String,
          enum: ["text", "image", "file"],
          default: "text",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true, collection: "conversations" }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
