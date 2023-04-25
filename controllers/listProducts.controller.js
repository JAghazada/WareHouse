const cache = require("memory-cache");
const getProductsHelper = require("../helpers/get-products");
const listProducts = async (req, res) => {
  const cacheKey = "productList";
  let products = await cache.get(cacheKey);
 
  if (!products) {
    products =await getProductsHelper();
    cache.put(cacheKey, products);
  }
  res.render("products", { products });
};
module.exports = listProducts;
