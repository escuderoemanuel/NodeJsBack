const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders'
  }]
});

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;