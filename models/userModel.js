// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
        type: String,
        required: true,
        unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    required: true,
  },
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
