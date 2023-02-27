const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const DB_URI = process.env.DB_URI;
const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((response) => console.log("connected to database"))
        .catch((err) => console.log(err));
};
module.exports = connect;