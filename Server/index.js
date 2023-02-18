require("express-async-errors")
const express = require("express");
const app = express();
const multer = require("multer");
const dotenv = require("dotenv");
const router = require("./routers");
const cors = require("cors");
const corsOption = require("./helpers/corsOptions")
const mongoSanitize = require("express-mongo-sanitize")
const errorHandlerMiddleware = require("./middlewares/ErrorHandler")

    //?dotenv configuration
dotenv.config();
const port = process.env.PORT || 5001;
//!Middlewares
app.use(cors(corsOption))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended:false}));
// app.use(multer().any());
app.use(express.static(__dirname + "/views/public"));
app.use("/upload",express.static(__dirname))
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
app.listen(port, () => {
    console.warn(`Server running on port: ${port}`);
});