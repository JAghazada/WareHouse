const mongoose = require("mongoose");

const ExportInvoiceSchema = new mongoose.Schema({
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
    collection:"export-invoice-schema",timestamps:true
});
module.exports = mongoose.model("export-invoice-schema",ExportInvoiceSchema)