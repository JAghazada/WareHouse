const mongoose = require("mongoose");
const expres = require("express");
const app = expres();
const passMongo = "aghazadA_013";
const userMongo = "JamilAghazadaProject";
const url = `mongodb+srv://${userMongo}:${passMongo}@cluster0.acqmhfp.mongodb.net/?retryWrites=true&w=majority`; //mongodb connection
const userSchema = require("./models/user/user");
// userSchema.find
app.use(expres.json());
async function connect() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
}
connect();
const adminRouter = require("./routers/product/ProductOperations");
app.use("/admin", adminRouter);

app.listen(5500, () => {
  console.log("Your app running on port 5500");
});
