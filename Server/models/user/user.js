const mongoose = require("mongoose");
const userLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isadmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});
module.exports = mongoose.model("user", userLoginSchema);
