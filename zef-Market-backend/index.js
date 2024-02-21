const {createServer} = require("http");
const { Server} = require("socket.io");
const path = require("path");
const cors = require("cors");
require("dotenv").config({path : "./config.env"});
const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const mongoose = require("mongoose");
const mountRoutes = require("./routes/indexMountRoutes");
const ProductModel = require("./models/productModel");
const cookieParser = require("cookie-parser");

const httpServer = createServer(app);
global.io = new Server(httpServer);

connectDb();

app.use(express.json());
app.use(cookieParser());

io.on("connection" , (socket) => {
  socket.on("client sends message" , (msg) => {
socket.broadcast.emit("server sends message from client to server" , {
  message : msg
})
  })
})

  // enable other domains accsess the app
  // app.use(cors());
  // app.options("*" , cors());

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONT_URL
    })
  );


  // app.use(cors({
  //   origin : process.env.FRONT_URL
  // }));

  // app.use(cors({
  //   origin : "http://localhost:3000"
  // }));


app.get("/", async (req, res) => {
  res.send("Zef Market Api is running....");
})


mountRoutes(app);


app.use((error , req , res , next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  next(error);
} )

app.use((error , req , res , next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({message : error.message , stack : error.stack});
  }  else {
    res.status(500).json({message : error.message});
  }

})




const port = process.env.PORT || 8000 ;

httpServer.listen(port , ()=> {
  console.log(`server is running on port ${port}`);
})


