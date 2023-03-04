require("express-async-errors")
const express = require("express");
const app = express();
const socket = require("socket.io")
const multer = require("multer");
const dotenv = require("dotenv");
const router = require("./routers");
const cors = require("cors");
const corsOption = require("./helpers/corsOptions")
const mongoSanitize = require("express-mongo-sanitize")
const errorHandlerMiddleware = require("./middlewares/ErrorHandler");
const bodyParser = require("body-parser");
const upload = multer()
    //?dotenv configuration
dotenv.config();
const port = process.env.PORT || 5001;
//!Middlewares
app.use(cors(corsOption))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.text({type: '/'}));
// app.use(upload.none())
// app.use(multer().any());
app.use(express.static(__dirname + "/views/public"));
// app.use("/uploads/images",express.static(__dirname))
// app.use("/uploadProduct",express.static(__dirname))


//!Enjection Middleware
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );
//!Router Middleware
app.use("/", router);

//?view engine configuration  
app.set("view engine", "ejs");

//!conect database
require("./database/connection/connect")()

//! error handler middleware
app.use(errorHandlerMiddleware)

//!listen server
const server = app.listen(port, () => {
    console.warn(`Server running on port: ${port}`);
});
const io = socket(server)
io.on("connection",(socket)=>{
  console.log(socket.id)
  socket.on("chat",data=>{
    io.sockets.emit("chat",{data,msg:"senin datan frontdan geldi"})
  })
})
