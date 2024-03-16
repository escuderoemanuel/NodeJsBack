const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;