const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: false },
  googleId: { type: String, unique: true, sparse: true },
  picture: String
});

module.exports = mongoose.model("User", UserSchema);