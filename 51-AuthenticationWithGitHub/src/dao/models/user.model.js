const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
  role: {
    type: String,
    default: 'user'
  },
})

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;

