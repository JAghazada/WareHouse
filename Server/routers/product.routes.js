const express= require("express");
const multer = require("multer");
const uploadProduct = require("../controllers/product.controller");
const ProductValidation = require("../middlewares/validation/product.validation");
const path = require("path")
const fs = require("fs")
const router = express.Router()
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const rootDir = path.dirname(require.main.filename);
        fs.mkdirSync(path.join(rootDir,"/public/uploads"),{recursive:true})
        cb(null,path.join(rootDir,"/public/uploads"))
    },
    filename:(req,file,cb)=>{
        const {firstname,lastname} = JSON.parse(JSON.stringify(req.body))
        const extension = file.originalname.split(".")[1]
        const uniqueSuffix = firstname + lastname
        let url = `${uniqueSuffix}.${extension}`
        cb(null,url)
       
    }
})
const uploads = multer({storage})

router.post("/uploadProduct",uploads.array("files",5),uploadProduct)

module.exports = router
