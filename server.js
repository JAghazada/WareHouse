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
const reports= require("./report");
//?dotenv configuration
dotenv.config();
const port = process.env.PORT || 5001;
//!Middlewares
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({type: '/'}));
app.use(express.static(__dirname + "/views/assets"));
app.use(session({
  secret:"VanqedMaster",
  resave:false,
  saveUninitialized:true,
  store:MongoStore.create({mongoUrl:process.env.DB_URI}),

}))


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
const server = require("http").createServer(app)
io = socket(server);
app.set("socketio",io)
server.listen(port, () => {
    console.warn(`Server running on port: ${port}`);
    // reports()
});
