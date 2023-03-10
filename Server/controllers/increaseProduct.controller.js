const productSchema = require("../database/models/productSchema");

const increaseProductController = async (req, res) => {
  const { obj_id, alter_code,count } = req.body;
//   const query = {
//     _id:obj_id
//   }
//      const products = await productSchema.find(query).sort({ createdAt: -1 });
//     res.json({
//         products
//     })
  try {
    const product = await productSchema.findOne({_id:obj_id});

    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı!" });
    }
    if(alter_code !== ""){
        product.QRcode.push(parseFloat(alter_code))
    }
    product.NumberOfProducts += parseFloat(count);
    await product.save();

    res.json({ message: "Ürün sayısı güncellendi!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bir hata oluştu!" });
  }
};

module.exports = increaseProductController;
