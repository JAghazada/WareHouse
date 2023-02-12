const mongoose = require("mongoose");
const expres = require("express");
const multer = require("multer")
const app = expres();
const passMongo = "aghazadA_013";
const userMongo = "JamilAghazadaProject";
const url = `mongodb+srv://${userMongo}:${passMongo}@cluster0.acqmhfp.mongodb.net/?retryWrites=true&w=majority`; //mongodb connection
const userSchema = require("./models/user/user");
// userSchema.find
app.use(expres.json());
app.use(expres.urlencoded({ extended: false }))
const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./images")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "---" + file.originalname)
        }
    })
    // uploadFile(req, res, (err) => {
    //     if (err instanceof multer.MulterError) {
    //         console.log("multerin poxu", err)
    //     } else if (err) {
    //         console.log("normal", err)

//         // An unknown error occurred when uploading.
//     }
//     res.send("Qagas senin faylun save olundu atam")

// })
const upload = multer({
    storage: fileStorageEngine,

}).array("image", 4)
app.get("/id", (req, res) => {
    res.json({
        name: "Jamil",
        surname: "Aghazada"
    })
})
app.post("/upload", (req, res) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return console.log(err)
                res.sendStatus(403)
            } else if (err) {
                return console.log(err)
            }
            console.log("everything ok bro")
        })
    })
    // async function connect() {
    //     try {
    //         mongoose.set("strictQuery", true);
    //         await mongoose.connect(url);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // connect();
const adminRouter = require("./routers/product/ProductOperations");
const { MulterError } = require("multer");
app.use("/admin", adminRouter);

app.listen(5500, () => {
    console.log("Your app running on port 5500");
});