const billSchema = require("../database/models/billSchema");
const productSchema = require("../database/models/productSchema");

const IDcreaseProductController = async (req, res) => {
  const { obj_id, alter_code,count,type } = req.body;
//   const query = {
//     _id:obj_id
//   }
//      const products = await productSchema.find(query).sort({ createdAt: -1 });
//     res.json({
//         products
//     })
  try {
    let  product = await productSchema.findOne({_id:obj_id});

    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı!" });
    }
    if(type==="increase" && alter_code !== ""){
        product.QRcode.push((alter_code));
    }
    if(type==="increase"){
      product.NumberOfProducts += parseFloat(count);
      // console.log("product: ",product)
      const data = {...product._doc}
      delete data._id
      data["Operation"] = "add";
      data["AmountAdded"] = count;
      // console.log(data)
      const bill = new billSchema(data);
      await bill.save()

    }else if(type==="decrease"){
      product.NumberOfProducts -= parseFloat(count);
    }
    // await product.save();
  
    res.json({ message: "Ürün sayısı güncellendi!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bir hata oluştu!" });
  }
};

module.exports = IDcreaseProductController;
