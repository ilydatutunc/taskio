const mongoose = require('mongoose');
const { Schema } = mongoose;

// Profile şeması
const profileSchema = new Schema({
  id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  position: { type: String, required: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
