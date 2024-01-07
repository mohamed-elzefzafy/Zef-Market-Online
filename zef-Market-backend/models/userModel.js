const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
name : {type : String , required : true },
lastName : {type : String , required : true },
email : {type : String , required : true , unique : true},
phoneNumber : {type : String },
address : {type : String },
country : {type : String },
zipCode : {type : String },
city : {type : String },
state : {type : String },
profilePhoto: {
  type : Object,
default : {
  url : "https://res.cloudinary.com/dw1bs1boz/image/upload/v1702487318/Zef-Blog/Default%20images/download_w26sr9.jpg",
  public_Id : null
}
},
password : {type : String , required : true },
isAdmin : {type : Boolean , required : true , default : false}
} , {timestamps: true});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;