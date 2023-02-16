const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: String,
        required: true,
        trim: true,
        default: false
    }
}, { collection: "users", timestamps: true });
module.exports = mongoose.model("userSchema", userSchema);