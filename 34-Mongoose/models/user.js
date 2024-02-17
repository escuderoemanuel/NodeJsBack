const mongoose = require('mongoose');

// Constructor => new instance => properties
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: 'Jane',
  },
  lastName: {
    type: String,
    default: 'Doe',
  },
  age: Number,
  email: {
    type: String,
    required: true,
    // unique: true,
  },
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;