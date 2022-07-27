const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmpassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const UserModel = mongoose.model("userModel", userSchema);

module.exports = UserModel;
