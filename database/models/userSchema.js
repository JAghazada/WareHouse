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
    phone:{
        type:String,
        required :true,
        trim:true
    },
    department: {
        type: String,
        required: true,
        trim: true,
        default: "Bazar"
    },
    permission:{
        type:Number,
        required:true,
        trim:true,
        default:0
    },
    isAdmin: {
        type: String,
        required: true,
        trim: true,
        default: false
    }
  
}, { collection: "users", timestamps: true });
module.exports = mongoose.model("userSchema", userSchema);