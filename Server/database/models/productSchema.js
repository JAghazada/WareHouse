const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    productName: {

    },

})
module.exports = mongoose.model("productSchema", productSchema)