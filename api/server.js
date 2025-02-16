const express = require("express");
const cors=require("cors")
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const app = express();
const logger=require("morgan");
const PORT = process.env.PORT || 5000;

//routes
const CategoryRoute=require("./../api/routes/Categories");
const ProductRoute=require("./../api/routes/products");
const billRoute=require("./../api/routes/bills");
const AuthRoute=require("./../api/routes/auth");
const UserRoute=require("./../api/routes/users");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB")
  } catch (error) {
    //console.log(error);
    throw error;
  }
};

//middlewares
app.use(logger("dev"))
app.use(express.json())
app.use(cors())

app.use("/api/categories",CategoryRoute);
app.use("/api/products",ProductRoute);
app.use("/api/bills",billRoute)
app.use("/api/auth",AuthRoute)
app.use("/api/users",UserRoute)

app.listen(PORT, () => {
    connect();
  console.log(`Example app listening on port ${PORT}`);
});


// app.get("/", (req, res) =>
//   res.send("Hello my friend this is home page server")
// );