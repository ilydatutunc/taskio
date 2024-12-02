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
      match: [/^\S+@\S+\.\S+$/, "Lütfen geçerli bir e-posta adresi girin"], 
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true, 
    },
    
    role: {
      type: String,
      enum: ["user", "admin"], // Kullanıcı rollerini belirler
      default: "user", // Varsayılan rol: kullanıcı
    },
    dateOfBirth: {
      type: Date,
      required: false, 
    },
  
  },
  { timestamps: true } 

const User = mongoose.model("User", userSchema);

module.exports = User;
