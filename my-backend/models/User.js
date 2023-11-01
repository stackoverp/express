const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  phoneNumber: {
    type: String,
    required: [true, "Please provide phone"],
  },
  passWord: {
    type: String,
    required: [true, "Please provide password"],
  },
  nameBank: {
    type: String,
    required: [true, "Please select a bank"],
  },
  numberBank: {
    type: String,
    required: [true, "Please provide bank account number"],
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt
    .hash(user.passWord, 10)
    .then((hash) => {
      user.passWord = hash;
      next();
    })
    .catch((error) => {
      next(error); // Pass the error to Express
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
