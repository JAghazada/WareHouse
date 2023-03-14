const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    Operation:{
      type:String,
      required:true,
      trim:true
    },
    AmountAdded:{
      type:Number,
      required:true,
      trim:true
    },
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    CompanyName: {
      type: String,
      trim: true,
    },
    Unit1: {
      type: String,
      required: true,
      trim: true,
    },
    Unit2: {
      type: String,
      trim: true,
    },
    UnitOfMeasurment: {
      type: String,
      required: true,
      trim: true,
    },
    SecondUnitOfMeasurment: {
      type: String,
      trim: true,
    },
    NumberOfProducts: {
      type: Number,
      required: true,
    },
    PurchasePrice: {
      type: Number,
      required: true,
    },
    SellingPrice: {
      type: Number,
      required: true,
    },
    MainCode: {
      type: Number,
      required: true,
    },
    QRcode: {
      type: Array,
    },
  },{collection: "Bills",timestamps: true, }
);
module.exports = mongoose.model("billSchema", billSchema);
