const redis = require("redis")
const client = redis.createClient({
  port: 6379
})
client.on("error", err => console.log(err));
(async () => {
  await client.connect()
})();
const saveNewRedisData = async (userID, data) => {
  try {
    const temporaryData = JSON.parse(await client.get("temporary-data")) || {};

    let userTemporaryData = temporaryData[userID] || {};
    userTemporaryData["result-temporary-data"] = { data }
    temporaryData[userID] = userTemporaryData
    const setResult = await client.set(
      "temporary-data",
      JSON.stringify(temporaryData)
    );

    if (setResult !== "OK") {
      return false;
    }
    return true;
  } catch (error) {
    return [];
  }
}


const saveDataToRedis=async(key,value)=>{
  await client.set(key,value)
}


const DeleteFromRedis = async (userID) => {
  try {
    const temporaryData = JSON.parse(await client.get("temporary-data")) || {};
    const userTemporaryData = temporaryData[userID] = {};

    const setResult = await client.set("temporary-data", JSON.stringify(userTemporaryData));
    if (setResult !== "OK") {
      console.log("Failed to save data to Redis");
      return false;
    }
    return true;
  }
  catch (error) {
    console.log("Error saving data to Redis:", error);
    return false;
  }

}
const saveToRedis = async (option, userID, data) => {
  try {
    const temporaryData = JSON.parse(await client.get("temporary-data")) || {};

    let userTemporaryData = temporaryData[userID] || {};

    let createList = userTemporaryData["create-list"] || [];
    let exportList = userTemporaryData["export-list"] || [];
    let addList = userTemporaryData["add-list"] || [];
    switch (option) {
      case "create":
        createList.push(data);
        userTemporaryData["create-list"] = createList;
        break;
      case "export":
        exportList.push(data);
        userTemporaryData["export-list"] = exportList;
        break;
      case "add":
        addList.push(data);
        userTemporaryData["add-list"] = addList;
        break;
    }

    temporaryData[userID] = userTemporaryData;
    const setResult = await client.set(
      "temporary-data",
      JSON.stringify(temporaryData)
    );

    if (setResult !== "OK") {
      console.log("Failed to save data to Redis");
      return false;
    }
    return true;
  } catch (error) {
    console.log("Error saving data to Redis:", error);
    return false;
  }
};


const getFromRedis = async (userID) => {
  const temporaryData = JSON.parse((await client.get("temporary-data"))) || {};
  let userTemporaryData = temporaryData[userID] || {};
  return {
    temporaryData,
    userTemporaryData
  }
};
const getTotalRedisData = async (userID) => {
  const redisData = (await getFromRedis(userID)).temporaryData[userID];
  let totalOrders = 0 
  try {
    totalOrders = redisData["create-list"]?.length || 0 + redisData["export-list"]?.length || 0 + redisData["add-list"]?.length || 0;
    return totalOrders
  } catch (error) {
    totalOrders = 0
    return totalOrders
  }

}
const getBarcodeListData = async(userID)=>{
  const data = await client.get(`${userID}-barcode-list`);
  return data
}
module.exports = {
  saveToRedis, getFromRedis, saveNewRedisData, DeleteFromRedis, getTotalRedisData,saveDataToRedis,getBarcodeListData
}