const  mongoose  = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true},
  orderTotal : {
    itemsCount : { type : Number , required : true},
    cartSubtotal : { type : Number , required : true},
  },
  cartItems : [
    {
      name : {type : String , required : true},
      price : {type : Number , required : true},
      image : {path : {type : String , required : true}},
      quantity : {type : Number , required : true},
      count : {type : Number , required : true},
    }
  ],
  paymentMethod: {
    type: String,
    required: true,
  },
  transActionResult : {
    status : {type :String},
    createTime : {type : String },
    amount : {type : Number}

  } ,
  isPaid : {
    type : Boolean,
    required : true ,
    default : false
  },
  paidAt : {type : Date},
  isDelivered : {
  type : Boolean,
  required : true ,
  default : false
},
deliverdAt : {type : Date},
  } ,{timestamps: true});


  
  const OrderModel =  mongoose.model("Order" , OrderSchema);

  module.exports = OrderModel;