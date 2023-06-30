const cache = require("memory-cache");
const getProductsHelper = require("../helpers/get-products");
const jwt =require("jsonwebtoken");
const { getTotalRedisData } = require("../helpers/redis-cache");
const listProducts = async (req, res) => {
  const cacheKey = "productList";
  let products = await cache.get(cacheKey);
  if (!products) {
    products =await getProductsHelper();
    cache.put(cacheKey, products);
  }
  const token = req.cookies.auth;
  const userId = jwt.decode(token).userID;
  const user = jwt.decode(token).userName;
  const permission = parseInt(jwt.decode(token).permission);
  const totalOrders = await getTotalRedisData(userId)
  res.render("products", { products,user,orders:totalOrders,permission });
};
module.exports = listProducts;
