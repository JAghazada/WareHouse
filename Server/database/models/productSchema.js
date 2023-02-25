const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        trim: true
    },
    NumberOfProducts: {
        type: Number,
        required: true,
        trim: true
    }, 
    OneProductContentCount: {
        type: Number,
        required: false,
        trim: true
    },
    UnitOfMeasurment: {
        type: String,
        required: true,
        trim: true
    },
    PurchasePrice: {
        type: Number,
        required: true,
        trim: true
    },
    SellingPrice: {
        type: Number,
        required: true,
        trim: true
    },
    QRcode: {
        type:Array,
        required: true,
        trim: true
    },
    MainCode:{
        type:Number,
        required:true,
        trim:true
    },
    Link:{
        type:String,
    }
    
})
module.exports = mongoose.model("productSchema", productSchema)