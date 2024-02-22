const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: 'Name'
  },
  lastName: {
    type: String,
    default: 'Lastname'
  },
  email: {
    type: String,
    default: '',
    require: true,
  },
  ssn: {
    type: String,
    required: true,
    unique: true
  },
  birthDate: {
    type: Date,
    default: ''
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    default: 'M'
  },
  courses: {
    type: Array,
    default: []
  }
})

// collection 'users' + schema
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;