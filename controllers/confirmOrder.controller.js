const productSchema = require("../database/models/productSchema");
const { updateCache } = require("../helpers/cache/update-memory");
const jwt = require("jsonwebtoken");
const { getFromRedis, DeleteFromRedis, saveDataToRedis } = require("../helpers/redis-cache");
const AddİnvoiceSchema = require("../database/models/AddİnvoiceSchema");
const CreateInvoiceSchema = require("../database/models/CreateInvoiceSchema");
const ExportInvoiceSchema = require("../database/models/ExportInvoiceSchema");
const confimOrderController = async (req, res) => {
  const userID = jwt.decode(req.cookies.auth).userID;
  const user = jwt.decode(req.cookies.auth).userName;
  if(!user || !userID){
    return res.json({
      message:"Zəhmət olmazsa giriş edin...",
      status:"Yönləndirilirsiniz",
      success:false
    })
  }
  const { userTemporaryData } = await getFromRedis(userID);
  let fixedTemporaryData = userTemporaryData["result-temporary-data"] || {};
  if (Object.keys(fixedTemporaryData).length === 0) {
    return res.json({
      message: "səbət boşdur"
    })
  }
  fixedTemporaryData = fixedTemporaryData.data

  const { userAddList, userExportList, userCreateList } = fixedTemporaryData;
  
  const errorList = [];
  let addListTotalPrice= 0
  let exportListTotalPrice = 0 ;  
  let createListTotalPrice  = 0;
  try {
    for (const addItem of userAddList) {

      addListTotalPrice+=parseInt(addItem.count) * addItem.price;
      await productSchema.findByIdAndUpdate(addItem.id, {
        $inc: { NumberOfProducts: + parseFloat(addItem.count) },
        $push: { QRcode: { $each: addItem.new_barcodes } },
      })
    };
    for (const item of userExportList) {
      exportListTotalPrice+=parseInt(item.count) * item.price
      await productSchema.findByIdAndUpdate(
        item.id,
        { $inc: { NumberOfProducts: - parseFloat(item.count) } }
      );

    };
    for (const item of userCreateList) {
      createListTotalPrice+=item.NumberOfProducts*item.SellingPrice
      const saveProduct = new productSchema(item);
      await saveProduct.save();
    }
    let resultAddList,resultExportList,resultCreateList; 
    if (userAddList.length !== 0) {
      const saveAddList = new AddİnvoiceSchema({ addedElements: userAddList,totalPrice:addListTotalPrice,seller:user,buyer:"depo" });
      resultAddList =  await saveAddList.save();
    }
    if (userExportList.length !== 0) {
      const saveExportList = new ExportInvoiceSchema({ addedElements: userExportList,totalPrice:exportListTotalPrice,seller:"depo",buyer:user });
      resultExportList = await saveExportList.save();
    }
    if (userCreateList.length !== 0) {
      const saveCreateList = new CreateInvoiceSchema({ addedElements: userCreateList,totalPrice:createListTotalPrice,seller:user,buyer:"depo" });
      resultCreateList=await saveCreateList.save();
    }
    const barcodesList = {
      userAddList,
      userExportList,
      userCreateList
    }
    
    await saveDataToRedis(`${userID}-barcode-list`,JSON.stringify(barcodesList));


    await updateCache();
    await DeleteFromRedis(userID);
    res.json({
      success:true,
      message:"Uğurlu şəkildə tamamlandi",
      "add-list-link":resultAddList?._id,
      "export-list-link":resultExportList?._id,
      "create-list-link":resultCreateList?._id,
    });

  } catch (error) {
    errorList.push(error);
    res.json({
      errorList,
      success:false
    })
  }

}
module.exports = confimOrderController