const path = require("path");
require("dotenv").config({path : "./config.env"});
const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const mongoose = require("mongoose");
const mountRoutes = require("./routes/indexMountRoutes");
const ProductModel = require("./models/productModel");
const cookieParser = require("cookie-parser");

connectDb();

app.use(express.json());
app.use(cookieParser());


app.get("/", async (req, res) => {
  res.send("Zef Market Api is running....");
})


mountRoutes(app);


app.use((error , req , res , next) => {
  console.log(error);
  next(error);
} )

app.use((error , req , res , next) => {
res.status(500).json({message : error.message , stack : error.stack});
})




const port = process.env.PORT || 8000 ;

app.listen(port , ()=> {
  console.log(`server is running on port ${port}`);
})


