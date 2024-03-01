const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  grade: Number,
  group: String
})
studentSchema.plugin(mongoosePaginate)
const studentModel = mongoose.model('students', studentSchema);

module.exports = studentModel;