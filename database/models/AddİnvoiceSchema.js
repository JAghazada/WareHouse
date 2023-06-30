const mongoose = require("mongoose");

const AddInvoiceSchema = new mongoose.Schema({
    addedElements : {
        type:Array,
        required:true
    },
    totalPrice : {
        type:Number,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    buyer:{
        type:String,
        required:true
    }
},{
    collection:"add-invoice-schema",timestamps:true
});






module.exports = mongoose.model("add-invoice-schema", AddInvoiceSchema);