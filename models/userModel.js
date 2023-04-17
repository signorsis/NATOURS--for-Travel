const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'please tell us your name'] },
  email: {
    type: String,
    required: [true, 'please tell us your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a vaild email'],
  },
  photo: String,
  pasword: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
  },
  paswordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
