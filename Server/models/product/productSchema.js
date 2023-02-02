const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("ProductSchema", ProductSchema);
