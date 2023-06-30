const productSchema = require("../database/models/productSchema");

const searchProduct = async (search_value) => {
  return await productSchema.find({
    $or: [
      { ProductName: { $regex: search_value, $options: "i" } },
      { CompanyName: { $regex: search_value, $options: "i" } },
      { NumberOfProducts: parseInt(search_value) || null },
      { PurchasePrice: parseInt(search_value) || null },
      { SellingPrice: parseInt(search_value) || null },
      { QRcode: { $regex: search_value, $options: "i" } },
      { MainCode: parseInt(search_value) || null },
      { Link: { $regex: search_value, $options: "i" } },
      { UnitOfMeasurment: { $regex: search_value, $options: "i" } },
      { SecondUnitOfMeasurment: { $regex: search_value, $options: "i" } },
      { Unit1: parseInt(search_value) || null },
      { Unit2: parseInt(search_value) || null },
      { Date: { $regex: search_value, $options: "i" } },
    ],
  });
};

module.exports = searchProduct;
