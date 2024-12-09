const conversationSchema = new Schema(
  {
    
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
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  
    timestamp: {
      type: Date,
      default: Date.now,
    },
    
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
