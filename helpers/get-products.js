const productSchema = require("../database/models/productSchema");
const translateJson = require("../routers/Translate/translate.json");

const getProductsHelper = async (query) => {
  let products; 
  if(query){
    console.log(query);
    products =await productSchema.find(query)
    .sort({createdAt:-1})
    .lean()

  }else{
    products = await productSchema
    .find()
    .sort({ createdAt: -1 })
    .lean(); // ! Bu "lean" fonksiyonu, verilerin daha hızlı alınmasını sağlar.
  }
   

  products.forEach((product) => {
    const parts = JSON.stringify(product.createdAt)
      .split("T")[0]
      .split(`"`)[1]
      .split("-");
    let formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    product.Date = formattedDate;

    // Sadece UnitOfMeasurment ve SecondUnitOfMeasurment öğelerini çeviriyoruz.
    product.UnitOfMeasurment =
      translateJson[product.UnitOfMeasurment.toLowerCase()] || "";
    product.SecondUnitOfMeasurment =
      translateJson[product.SecondUnitOfMeasurment.toLowerCase()] || "";
  });

  return products;
};

module.exports = getProductsHelper