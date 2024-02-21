const mongoose = require("mongoose");
const ReviewModel = require("./reviewModel");

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
  // category : {
  //   type : String,
  //   required : true,
  // },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
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
  attrs : [
    {key : {type : String} , value : {type : String}}
  ],
  images : [],
  
  reviews : [
    {
      comment : {
        type : String ,
        required : true
      },
      rating : {
        type : Number ,
        required : true
      },
      user : {
        userId : String,
        name : String,
        lastName : String,
        profilePhoto : Object
      } , 
      createdAt :Date,
    
    }
  ],
} , {timestamps : true});


productSchema.pre(/^aggregate/ , function (next) {
  this.populate({
    path : "category" ,
    select :  "name"
  })
  next();
})

const ProductModel = mongoose.model("Product" , productSchema);

productSchema.index({name : "text", description : "text"} , {name : "textIndex"});
productSchema.index({ "atrrs.key" : 1 , "atrrs.value"  : 1});

module.exports = ProductModel;