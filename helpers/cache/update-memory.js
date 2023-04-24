const cache = require("memory-cache");
const productSchema = require("../../database/models/productSchema");
const getProductsHelper = require("../get-products");
const clearMemory = ()=>{
    cache.clear()
}
const updateCache = async()=>{
    clearMemory();
    let products =await getProductsHelper()
    cache.put("productList",products);
    console.log("Updated cache: \n",cache.get("productList"));
}
module.exports = {
    clearMemory,
    updateCache
}