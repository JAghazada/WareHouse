const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
        trim: true
    }, 
    CompanyName: {
        type: String,
        required: true,
        trim: true
    },
    NumberOfProducts: {
        type: Number,
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
    },
    UnitOfMeasurment: {
        type: String,
        required: true,
        trim: true
    }, 
    SecondUnitOfMeasurment: {
        type: String,
        required: true,
        trim: true
    },
    Unit1:{
        type:Number,
        required:true
    }, 
    Unit2:{
        type:Number,
        required:true
    },
    
  

    
},{ collection: "products", timestamps: true });
module.exports = mongoose.model("productSchema", productSchema)