const CreateInvoiceSchema = require("../database/models/CreateInvoiceSchema");
const AddİnvoiceSchema = require("../database/models/AddİnvoiceSchema");
const ExportInvoiceSchema = require("../database/models/ExportInvoiceSchema");
const jwt = require("jsonwebtoken");
const { getTotalRedisData } = require("../helpers/redis-cache");
const BillPageController = async(req,res)=>{
        const createBills = await CreateInvoiceSchema.find({}).sort({ createdAt: -1 });
        const addBills = await AddİnvoiceSchema.find({}).sort({ createdAt: -1 });
        const exportBills = await ExportInvoiceSchema.find({}).sort({ createdAt: -1 });
        const user = jwt.decode(req.cookies.auth).userName;
        const userID = jwt.decode(req.cookies.auth).userID;
        const totalOrders =await getTotalRedisData(userID);
        res.render("bill",{
            createBills,
            user,
            addBills,
            exportBills,
            orders:totalOrders
        })
    
}
module.exports = BillPageController