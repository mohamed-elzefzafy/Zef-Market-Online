const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
name : {type : String , required : true , unique : true},
description : {type : String , default : "default acategory description"},
image : {type : String , default :"/images/tablets-category.png"},
attrs : [{key : {type : String} , value : [{type : String}]}]
} , {timestamps: true});

CategorySchema.index({description : 1})
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;