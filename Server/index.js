const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./routers");

//?dotenv configuration
dotenv.config();
const port = process.env.PORT || 5001;

//!Middlewares
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 }));
app.use(express.static(__dirname + "/views/public"));
//!Router Middleware
app.use("/auth", router);

//?view engine configuration  
app.set("view engine", "ejs");

//!conect database
require("./database/connection/connect")()

//!listen server
app.listen(port, () => {
    console.warn(`Server running on port: ${port}`);
});