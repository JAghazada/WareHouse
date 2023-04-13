const mongoose = require("mongoose");
const withDrawSchema = new mongoose.Schema({
    operation:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    basket :{
        type : Array,
        required:true
    },
    date : {
        type :String,
        required:true
    }
},{collection:"WithDrawBills",timestamps:true});

module.exports = mongoose.model("withDrawSchema",withDrawSchema)
