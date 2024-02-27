const  mongoose  = require("mongoose");
const UserModel = require("./userModel");

const CartSchema = new mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId , ref : UserModel , required : true},
  orderTotal : {
    carItemsLength : { type : Number , required : true},
    cartSubtotal : { type : Number , required : true},
  },
  cartItems : [
    {
      name : {type : String , required : true},
      productId : {type : String , required : true},
      price : {type : Number , required : true},
      images : {type : Object , required : true},
      quantity : {type : Number , required : true},
      count : {type : Number , required : true},
    }
  ],
  } ,{timestamps: true});


  
  const CartModel =  mongoose.model("Cart" , CartSchema);

  module.exports = CartModel;