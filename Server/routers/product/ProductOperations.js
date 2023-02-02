const expres = require("express");
const Router = expres.Router();
const ProductSchema = require("../../models/product/productSchema");
const productSchema = require("../../models/product/productSchema");
Router.get("/admin", (req, res) => {
  res.send("Get Request");
});
Router.post("/saveUser", async (req, res) => {
  res.send(req.body);
});
//add
Router.post("/addproduct", async (req, res) => {
  const name = req.body.name;
  const cost = req.body.cost;
  await productSchema.create(
    {
      productName: name,
      cost,
    },
    (err, post) => {
      console.log(err);
      console.log(post);
    }
  );
});
//delete
Router.delete("/deleteproduct", (req, res) => {});
//change
Router.post("/editproduct", (req, res) => {});

module.exports = Router;
