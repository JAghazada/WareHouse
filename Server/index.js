const express = require("express")
const app = express();
const connect = require("./database/connection/connect")
const pageRoute = require("./route/pageRoute")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views/public"))

try {
    connect()
} catch (error) {
    console.log("error", error)
}
app.use("/", pageRoute)
app.listen(5000, () => {
    console.warn("Server running at prot 5000")
})