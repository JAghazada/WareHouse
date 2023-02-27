const productSchema = require("../database/models/productSchema");

const listProducts = async (req, res) => {
  const products = await productSchema.find();
  //     let Codes = products.map(product=>product.QRcode)
  //     Codes = Codes.map(code=>code[0].split(",")[0])
  //     console.log(Codes)

  res.render("products", { products });
  // res.json(products)
};
module.exports = listProducts;
