const productSchema = require("../database/models/productSchema");
const translateJson = require("../routers/Translate/translate.json");
const listProducts = async (req, res) => {
  const products = await productSchema.find().sort({ createdAt: -1 });
  products.map(product=>{
     product.UnitOfMeasurment = translateJson[product.UnitOfMeasurment.toLowerCase()]
     product.SecondUnitOfMeasurment = translateJson[product.SecondUnitOfMeasurment.toLowerCase()]
     return product
  })
  res.render("products", { products });
};
module.exports = listProducts;
