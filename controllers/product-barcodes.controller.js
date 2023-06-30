const getProductsHelper = require("../helpers/get-products")

const ProductBarcodesController  = async(req,res) =>{
    const products = await getProductsHelper();
    res.render("product-barcodes",{products})
}

module.exports = {ProductBarcodesController}