const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  isadmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});
module.exports = mongoose.model("user", userSchema);
