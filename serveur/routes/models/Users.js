const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = Question = mongoose.model("user", UsersSchema, "user");
