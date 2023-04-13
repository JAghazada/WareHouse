const getBill = require("../controllers/bill.controller");
const router = require("express").Router();
const billSchema = require("../database/models/billSchema");
const translateJson = require("./Translate/translate.json");

router.get("/products/bill/profits", async (req, res) => {
  const { date } = req.query;
  const bills = await billSchema.find({ Date: date });
  bills.map(bill=>{
    return bill.Operation = translateJson[bill.Operation]
  });
  res.render("profit-bill",{bills});

});

router.post("/createBill", (req, res) => {});

router.post("/insertBill", (req, res) => {});

module.exports = router;
