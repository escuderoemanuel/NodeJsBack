const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: 'John'
  },
  lastName: {
    type: String,
    default: 'Doe'
  },
  email: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    default: 'Male'
  },
  courses: {
    type: Array,
    default: []
  }
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;