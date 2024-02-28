const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'courses'
        }
      }
    ]
  }
});

// middleware que para cada find hace un populate
studentSchema.pre('find', function (next) {
  this.populate('courses.course');
  next();
})

const studentModel = mongoose.model('students', studentSchema);
module.exports = studentModel;