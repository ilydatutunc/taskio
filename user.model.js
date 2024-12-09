const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Lütfen geçerli bir e-posta adresi girin"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "manager"], // Roller: user ve manager
      default: "user"
    },

    dateOfBirth: {
      type: Date,
      required: false
    },

    
    department: { 
      type: String,
      required: function() { return this.role === 'manager'; }, 
      minlength: 3
    },

    permissions: {
      type: [String],
      required: function() { return this.role === 'manager'; }, 
      enum: ["create", "edit", "delete", "view"]
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
