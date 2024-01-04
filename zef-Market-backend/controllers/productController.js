const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const recordsPerPage = require("../config/pagination");


 /**---------------------------------------
 * @desc    get products
 * @route   /api/v1/products
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllProducts = asyncHandler(async (req , res) => {
  const pageNum = Number(req.query.page) || 1;
  const totalProducts = await ProductModel.countDocuments({});
  
  let sort = {};
  const sortOption = req.query.sort || "";
if (sortOption) {
  const newSortOption = sortOption.split("_");
  sort = {[newSortOption[0]] : Number(newSortOption[1])}
  console.log(sort);
}


  const skiped = (pageNum - 1) *  recordsPerPage;
  const products = await ProductModel.find({}).skip(skiped).sort(sort).limit(recordsPerPage);

  res.status(200).json({products , pageNum ,  pageLinksNumber : Math.ceil(totalProducts / recordsPerPage)})
 })