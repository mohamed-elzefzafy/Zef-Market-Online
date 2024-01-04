const CategoryModel = require("../models/categoryModel");
const ProductModel = require("../models/productModel");
const categoryData = require("./categories");
const path = require("path");
require("dotenv").config({path : "./config.env"});
const connectDb = require("../config/connectDb");
const products = require("./products");
const reviews = require("./reviews");
const ReviewModel = require("../models/reviewModel");
const UserModel = require("../models/userModel");
const users = require("./users");
const OrderModel = require("../models/orderModel");
const orders = require("./orders");

connectDb();

const importData = async () => {
try {
await CategoryModel.collection.dropIndexes();
await ProductModel.collection.dropIndexes();


  await CategoryModel.collection.deleteMany({});
   await ProductModel.collection.deleteMany({});
   await ReviewModel.collection.deleteMany({});
   await UserModel.collection.deleteMany({});
   await OrderModel.collection.deleteMany({});

  await CategoryModel.insertMany(categoryData);
 const reviewsDat = await ReviewModel.insertMany(reviews);
 await UserModel.insertMany(users);
 await OrderModel.insertMany(orders)

 const exapleProduct = products.map(product => {
  reviewsDat.map(review => {
    product.reviews.push(review._id)
  })
return { ...product};
 })

 await ProductModel.insertMany(exapleProduct);


  console.log("seeder data proceed successfully");
  process.exit();
} catch (error) {
  console.error("error while seeder data" + error);
  process.exit(1);
}
}

importData();


// node seeder/seeder.js 