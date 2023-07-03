require("express-async-errors")
const express = require("express");
const app = express();
const socket = require("socket.io")
const dotenv = require("dotenv");
const router = require("./routers");
const session = require("express-session");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize")
const errorHandlerMiddleware = require("./middlewares/ErrorHandler");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const reports = require("./report");
const searchProduct = require("./controllers/search.controller");
const getProductsHelper = require("./helpers/get-products");
const cookieParser = require("cookie-parser");
//?dotenv configuration
dotenv.config();
const port = process.env.PORT || 5001;
//!Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: '/' }));
app.use(express.static(__dirname + "/views/assets"));

app.use(cookieParser())

app.use(cors())


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
app.use((req, res) => {
  res.json({
    "message": "bele sehife yoxdur :("
  })
})
const server = require("http").createServer(app)
// ? socket
const io = socket(server);
io.on("connection", (socket) => {
  socket.on("getProducts", async (search_value) => {
    let products = await searchProduct(search_value);

    products = products.map((product) => {
      const parts = JSON.stringify(product.createdAt)
        .split("T")[0]
        .split(`"`)[1]
        .split("-");
      let formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

      return {
        ...product.toObject(),
        Date: formattedDate

      }
    });
    return socket.emit("products", products);
  });
  socket.on("request:get-all-product", async () => {
    const products = await getProductsHelper();
    return socket.emit("response:get-all-product", products)
  })

})
app.set("socketio", io)
//!listen server

server.listen(port, () => {
  console.warn(`Server running on port: ${port}`);
  // reports()
});
