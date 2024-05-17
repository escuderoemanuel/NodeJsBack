import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const UserModel = model('users', userSchema);

export default UserModel;