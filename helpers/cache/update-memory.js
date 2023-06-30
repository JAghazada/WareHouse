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
}
module.exports = {
    clearMemory,
    updateCache
}