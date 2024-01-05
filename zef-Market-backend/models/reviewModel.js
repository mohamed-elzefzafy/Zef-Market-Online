const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
comment : {
  type : String ,
  required : true
},
rating : {
  type : Number ,
  required : true
},
user : {
  _id : {type : mongoose.Schema.Types.ObjectId , required : true},
  name : {type : String , required : true}
}
} , {timestamps: true});

const ReviewModel = mongoose.model("Review" , ReviewSchema);

module.exports = ReviewModel;