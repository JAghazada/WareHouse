const productSchema = require("../database/models/productSchema");
const translateJson = {
  number: "Əd",
  kg: "Kg",
  cm: "Sm",
  dm: "Dm",
  box: "Qutu",
  meter: "Metr",
  block: "Blok",
  wholesale: "Top",
  bag: "Kisə",
  set: "Dəst",
  packet: "Paket",
};
const listProducts = async (req, res) => {
  const products = await productSchema.find().sort({ createdAt: -1 });
  const final_data = []
  products.map(product=>{
     product.UnitOfMeasurment = translateJson[product.UnitOfMeasurment.toLowerCase()]
     product.SecondUnitOfMeasurment = translateJson[product.SecondUnitOfMeasurment.toLowerCase()]
     return product
  })
  res.render("products", { products });
};
module.exports = listProducts;
