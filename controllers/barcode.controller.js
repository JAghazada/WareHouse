const { getBarcodeListData } = require("../helpers/redis-cache")
const jwt = require("jsonwebtoken");
const barcodeController = async (req, res) => {
    const userID = jwt.decode(req.cookies.auth).userID;
    const barcodelist = await getBarcodeListData(userID);
    const { userAddList, userExportList, userCreateList } = JSON.parse(barcodelist) || []
    // console.log(barcodelist["userAddList"]);
    res.render("barcodes", {
        "userAddList": JSON.stringify(userAddList),
        "userExportList": JSON.stringify(userExportList),
        "userCreateList": JSON.stringify(userCreateList)
    })
}

module.exports = { barcodeController }