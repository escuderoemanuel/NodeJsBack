const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  grade: Number,
  group: String
})

const studentModel = mongoose.model('students', studentSchema);

module.exports = studentModel;