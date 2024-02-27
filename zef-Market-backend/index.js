const {createServer} = require("http");
const { Server} = require("socket.io");
const path = require("path");
const cors = require("cors");
var helmet = require("helmet");
require("dotenv").config({path : "./config.env"});
const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const mongoose = require("mongoose");
const mountRoutes = require("./routes/indexMountRoutes");
const ProductModel = require("./models/productModel");
const cookieParser = require("cookie-parser");

app.use(helmet({
  //   contentSecurityPolicy: false, 
  // crossOriginEmbedderPolicy: false
}));

const httpServer = createServer(app);
global.io = new Server(httpServer);

connectDb();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    // credentials: true,
    withCredentials : true,
    origin: process.env.FRONT_URL
  })
);


const admins =[];
let activeChat = [];

function  get_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
io.on("connection" , (socket) => {
    socket.on("admin connected with server" , adminName => {
admins.push({id : socket.id , admin : adminName})

    } )
  socket.on("client sends message" , (message) => {
    if (admins.length === 0) {
      socket.emit("admin not found" , "")
    } else {
      let client = activeChat.find(client => client.clientId === socket.id);
      let targetAdminId;
      if (client) {
        targetAdminId = client.adminId;
      } else {
        let admin = get_random(admins);
        activeChat.push({clientId : socket.id , adminId : admin.id});
        targetAdminId = admin.id;
      }

socket.broadcast.to(targetAdminId).emit("server sends message from client to admin" , {
  user : socket.id,
  message : message
})
    }

  })
  socket.on("Admin sends message" , ({user , message}) => {
    socket.broadcast.to(user).emit("server sends message from admin to client" , message)
  })

  socket.on("Admin closes chat" , (socketId) => {
    socket.broadcast.to(socketId).emit("admin closed chat" , "");
    let c = io.sockets.sockets.get(socketId);
    c.disconnect();
  })

  socket.on("disconnect" , (reason) => {
    // admin disconnected
    const removeIndex = admins.findIndex(item => item.id === socket.id);
    if (removeIndex !== -1) {
      admins.splice(removeIndex , 1);
    }
    activeChat = activeChat.filter((item) => item.adminId !== socket.id);
    // client disconnected
    const removeIndexClient = activeChat.findIndex(item => item.clientId === socket.id);
    if (removeIndexClient !== -1) {
      activeChat.splice(removeIndexClient , 1);
    }
  socket.broadcast.emit("disconnected" , {reason : reason , socketId : socket.id})

  })

})

  // enable other domains accsess the app
  // app.use(cors());
  // app.options("*" , cors());




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


