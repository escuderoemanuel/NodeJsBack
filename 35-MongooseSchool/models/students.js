const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  }
})

// Constant of the Model=> mongoose.model('nameCollection', NameSchema)
const StudentsModel = mongoose.model('students', studentsSchema);
// Export Model
module.exports = StudentsModel;