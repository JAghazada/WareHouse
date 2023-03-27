const productSchema = require("../database/models/productSchema");
const translateJson = require("../routers/Translate/translate.json");

const searchProduct = async (req, res) => {
  try {
    let { name, selectVal } = req.body;
    let query = {};
    if ((selectVal === "PurchasePrice" || selectVal === "SellingPrice") && !/^[0-9]+$/.test(name)) {
        name = 0
    }
    switch (selectVal) {
      case "ProductName":
        query = { ProductName: { $regex: new RegExp(name, "i") } };
        break;
      case "QRcode":
        
        query = { QRcode: { $regex: new RegExp(name, "i") } };
        break;
      case "PurchasePrice":
        query = {PurchasePrice: parseFloat(name) };
        break;
      case "SellingPrice":
        query = { SellingPrice: parseFloat(name) };
        break;
      default:
        throw new Error("Invalid selectVal value");
    }
   try {
    const products = await productSchema.find(query).sort({ createdAt: -1 });
    products.map(product=>{
      product.UnitOfMeasurment = translateJson[product.UnitOfMeasurment.toLowerCase()]
      product.SecondUnitOfMeasurment = translateJson[product.SecondUnitOfMeasurment.toLowerCase()]
      return product
   })
    res.json(products);
   } catch (error) {
    console.log(error)
   }
  
  } catch (error) {
    console.log(error);
  }
};

module.exports = searchProduct;
