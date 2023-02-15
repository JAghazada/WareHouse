const mongoose = require("mongoose");
const connect = () => {
    mongoose.set("strictQuery", true)
    mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName: "WareHouse"
        })
        .then(response => console.log("response"))
        .catch(err => console.log(err))

}
module.exports = connect