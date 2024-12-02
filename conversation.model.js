const mongoose = require('mongoose');
const { Schema } = mongoose;


const conversationSchema = new Schema(
  {
    id:{
      type:String,
      required: true,
    },
    participants:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //bunda kullanıcıları nasıl user1 user 2 diye yarıcam bilemedim.
    },

    team: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Team", 
      required: true,
    },
   
    text: {
       [
      type: String,
      required: true, ]
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
    isRead: {
      type: Boolean,
      default: false, 
  },

  { timestamps: true } 
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
