const express = require("express")
const app = express();
const connect = require("./database/connection/connect")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views/public"))
app.get("/", (req, res) => {
    res.render("index")
})
try {
    connect()
} catch (error) {
    console.log("error", error)
}
app.listen(5000, () => {
    console.warn("Server running at prot 5000")
})