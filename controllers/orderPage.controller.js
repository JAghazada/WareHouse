const { getFromRedis, saveNewRedisData, getTotalRedisData } = require("../helpers/redis-cache");
const jwt = require("jsonwebtoken");
const orderPageController = async(req,res) => {
    const userID = jwt.decode(req.cookies.auth).userID;
    const {userTemporaryData} = await getFromRedis(userID);
    const userName = jwt.decode(req.cookies.auth).userName
    let createList  = userTemporaryData["create-list"] || [];
    let exportList = userTemporaryData["export-list"] || [];
    let addList = userTemporaryData["add-list"] || [];
    const totalOrders = await getTotalRedisData(userID);
    if(Object.keys(userTemporaryData).length === 0){
      return res.render("order",{
        user:userName,
        createList:[],
        userAddList:[],
        userExportList:[],
        orders:totalOrders
      })
    }
    const _uniqueAddList = {

    }
    const _uniqueExportList = {

    }
    if(addList.length !== 0 ){
      addList.forEach(item=>{
        const id = item.id;
        const count = item.count;
        const new_barcodes = item.new_barcodes
        if(_uniqueAddList[id]){
          _uniqueAddList[id].count =parseInt(_uniqueAddList[id].count) + parseInt(count);
           _uniqueAddList[id].new_barcodes = [..._uniqueAddList[id].new_barcodes , ...new_barcodes];

        }else{
          _uniqueAddList[id] = {
            ...item,

          }
        }
      })
    };
    if(exportList.length !== 0 ){
      exportList.forEach(exportItem =>{
        const id = exportItem.id;
        const count = exportItem.count;
        if(_uniqueExportList[id]){
          _uniqueExportList[id].count = parseInt(_uniqueExportList[id].count) + parseInt(count);
        }else{
          _uniqueExportList[id] = {
            ...exportItem
          }
        }
      })
    }
    const userAddList = [...Object.values(_uniqueAddList)]
    const userExportList = [...Object.values(_uniqueExportList)]
    const saveData= await saveNewRedisData(userID,{
      userAddList,userExportList,userCreateList : createList
    })
    res.render("order",{
         user:userName,
        saveData,
        createList,
        userAddList,
        userExportList,
        orders:totalOrders

    })
        

}
module.exports = orderPageController