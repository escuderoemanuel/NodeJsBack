const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    index: true,
  },
  last_name: String,
  email: String,
  gender: String,
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;