const mongoose = require('mongoose');
const { Schema } = mongoose;

// Grup Şeması
const groupSchema = new Schema(
  {
    groupId: {
      type: String, 
      required: true, // Grup ID'si zorunlu
      unique: true  // Benzersiz olacak
    },
    groupName: {
      type: String,
      required: true, // Grup adı zorunlu
    },
    groupCode: {
      type: String,
      required: true, // Grup kodu zorunlu
      unique: true  // Benzersiz olacak
    },
    users: [
      {
        type: String,  // Kullanıcı adı bir string olarak kaydediliyor
        required: true
      }
    ]
  },
  { timestamps: true, collection: 'groups' }  // Timestamp eklenir (createdAt, updatedAt)
);

// Model oluşturma
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
