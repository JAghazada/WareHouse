const router = require("express").Router()
const auth = require("./auth.routes")
const admin = require("./admin.routes")
const page = require("./page.routes")
const product = require("./product.routes")
const upload = require("../middlewares/lib/upload/upload")
const multer = require("multer")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
router.post("/upload",async function(req,res){
  await  upload(req,res,function (err){
        if(err instanceof multer.MulterError)
            throw new APIError("Something went wrong when image upload",400)
        else if(err)
            // throw new APIError("Something went wrong when image upload",400)
            // console.log("zbikdmlq")
           res.status(403).json({
            message:`Accepted file types :["image.jpg","image.png","image.jpeg","image.gif"]`
           })

        else
            return new Response(req.savedImages,"upload is successful").success(res) 
    })
})
router.use(product)
router.use(page)
router.use(admin)
router.use(auth)


module.exports = router