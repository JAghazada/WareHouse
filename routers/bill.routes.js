const express = require("express");

const BillPageController = require("../controllers/bill.page.controller");
const CreateInvoiceSchema = require("../database/models/CreateInvoiceSchema");
const AddİnvoiceSchema = require("../database/models/AddİnvoiceSchema");
const ExportInvoiceSchema = require("../database/models/ExportInvoiceSchema");

const router = express.Router();
const jwt =require("jsonwebtoken");
const { getTotalRedisData } = require("../helpers/redis-cache");
router.get("/bill",async(req, res) => {
    const idParam = req.query.id;
    const typeParam = req.query.type;
    let invoice;
    switch (typeParam) {
        case "create":
             invoice =( await CreateInvoiceSchema.findById(idParam))
            break;
        case "add":
            invoice =( await AddİnvoiceSchema.findById(idParam))
            break

        case "export":
            invoice =( await ExportInvoiceSchema.findById(idParam))
            
            break
        default:
            break;
    }
    const createdAt = invoice.createdAt;


    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript'te aylar 0-11 arasında indekslenir
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const token = req.cookies.auth;
    const userName= jwt.decode(token).userName;
    const userID = jwt.decode(token).userID;
    const totalOrders = await getTotalRedisData(userID)
    res.render("invoice",{
        total:invoice.totalPrice,
        seller:invoice.seller,
        buyer:invoice.buyer,
        user:userName,
        id:idParam,
        date:formattedDate,
        invoice:invoice.addedElements,
        type:typeParam,
        orders:totalOrders
    })
  });
router.get("/bills",BillPageController)
module.exports = router