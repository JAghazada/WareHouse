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
        type: String,
        required: true,
        trim: true
    },
    İmage: {
        type: String,
        required: true,
        trim: true
    },
})
module.exports = mongoose.model("productSchema", productSchema)