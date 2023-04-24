const cache = require("memory-cache");
const productSchema = require("../database/models/productSchema");
const translateJson = require("../routers/Translate/translate.json");
const getProductsHelper = require("../helpers/get-products");
const listProducts = async (req, res) => {
  const cacheKey = "productList";
  let products = await cache.get(cacheKey);
  console.log(products);
  if (!products) {
    products =await getProductsHelper();
    cache.put(cacheKey, products);
  }
  res.render("products", { products });
};
module.exports = listProducts;
