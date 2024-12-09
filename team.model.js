const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
  
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 250,
      default: "No description provided...",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
