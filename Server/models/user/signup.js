const mongoose = require("mongoose")
const userSignupSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    repass:{
        type:String,
        required:true
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false,
    },

})
module.exports = mongoose.model("signup",userSignupSchema)