const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
   path : {type : String , required : true}
  })

const productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
  description : {
    type : String,
    required : true,
  },
  category : {
    type : String,
    required : true,
  },
  count : {
    type : Number,
    required : true,
  },
  price : {
    type : Number,
    required : true,
  },
  rating : {
    type : Number,
  },
  reviewsNumber : {
    type : Number,
  },
  sales : {
    type : Number,
    default : 0,
  }, 
  atrrs : [
    {key : {type : String} , value : {type : String}}
  ],
  images : [ImageSchema],
  reviews : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
} , {timestamps : true});

const ProductModel = mongoose.model("Product" , productSchema);

productSchema.index({name : "text", description : "text"} , {name : "textIndex"});
productSchema.index({ "atrrs.key" : 1 , "atrrs.value"  : 1});

module.exports = ProductModel;