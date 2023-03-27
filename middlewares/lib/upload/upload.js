const multer = require("multer");
const path =require("path")
const fs =require("fs")
const fileFilter =(req,file,cb)=>{
    const acceptedMimeTypes = ["image/jpeg","image/png","image/gif","image/jpg",]
    if(!acceptedMimeTypes.includes(file.mimetype)){
        return cb(new Error("This image  mimetype not  supported"),false)
     }
      return cb(null,true)

}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const rootDir = path.dirname(require.main.filename);
        fs.mkdirSync(path.join(rootDir,"/public/"),{recursive:true})//? create File
        cb(null,path.join(rootDir,"/public/"))//? write into file
    },
    filename:(req,file,cb)=>{
        const extension = file.mimetype.split("/")[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        let url= `image_${uniqueSuffix}.${extension}`
        cb(null,url)
    }
})
const uploadFile = multer({storage,fileFilter}).array("images",5);
module.exports = uploadFile