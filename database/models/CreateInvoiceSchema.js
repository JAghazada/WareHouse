const mongoose = require("mongoose");

const CreateInvoiceSchema = new mongoose.Schema({
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
    collection:"create-invoice-schema",timestamps:true
});


module.exports = mongoose.model("create-invoice-schema",CreateInvoiceSchema);
