const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'premium', 'admin'],
    default: 'user',
  },
  lastConnection: {
    type: Date,
    default: null,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  documents: {
    profilePicture: { type: String, default: null },
    identification: { type: String, default: null },
    proofOfAddress: { type: String, default: null },
    proofOfAccountStatus: { type: String, default: null },
  },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
