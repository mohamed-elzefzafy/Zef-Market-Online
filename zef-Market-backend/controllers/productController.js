const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const recordsPerPage = require("../config/pagination");
const path = require("path");
const {v4 : uuid4} = require("uuid");
const { cloudinaryUploadImage, cloudinaryRemoveMultipleImage } = require("../utils/cloudinary");


 /**---------------------------------------
 * @desc    get products
 * @route   /api/v1/products
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllProducts = asyncHandler(async (req , res) => {
let  query = {}
let queryCondition = false;
let priceQueryCondition = {};
if (req.query.price) {
  queryCondition = true;
  priceQueryCondition = {price : {$lte : Number(req.query.price)}};
}

let ratingQueryCondition = {};
if (req.query.rating) {
  queryCondition = true;
  ratingQueryCondition = {rating : {$in : req.query.rating.split(",")}};
}

let categoryQueryCondition = {}; 
const productCategory = req.params.categoryId || "";

if (productCategory) {
  queryCondition = true;
let a = productCategory.replace("," , "/");
var regEx = new RegExp("^" + a)
  categoryQueryCondition = { category : regEx };
}


if (req.query.category) {
  queryCondition = true;
let a = req.query.category.split(",").map((item) => {
  if (item) return new RegExp("^" + item)
})
  categoryQueryCondition = { category : {$in : a} };
}

let attrsQueryCondition = []; 
if (req.query.attrs) {
  queryCondition = true;
  attrsQueryCondition = req.query.attrs.split(",").reduce((acc , item) => {
  if (item) {
  let a = item.split("-")
  let values = [...a];
  values.shift();
  let a1 = {
    atrrs : {$elemMatch : {key : a[0] , value : {$in : values }}}
  }
acc.push(a1);
return acc;
  } else {
    return acc
  }
  } , [])
}


    //pagination
const pageNum = Number(req.query.page) || 1;

// sortting
let sort = {};
const sortOption = req.query.sort || "";
if (sortOption) {
const newSortOption = sortOption.split("_");
sort = {[newSortOption[0]] : Number(newSortOption[1])}
console.log(sort);
}




const searchQuery = req.params.searchQuery || "" ;
let searchQueryCondition = {}; 
let select = {};
if (searchQuery) {
  queryCondition = true ;
  searchQueryCondition = {$text : {$search : searchQuery}};
  select = {
    score : {$meta : "textScore"}
  }

  sort = {score : {$meta : "textScore"}}
}



if (queryCondition) {
  query = {
    $and :[priceQueryCondition , ratingQueryCondition , categoryQueryCondition , ...attrsQueryCondition , searchQueryCondition]
  }
  
}


  const skiped = (pageNum - 1) *  recordsPerPage;
  const totalProducts = await ProductModel.countDocuments(query);
  const products = await ProductModel.find(query).skip(skiped).sort(sort).limit(recordsPerPage).select(select);

  res.status(200).json({products , pageNum ,  pageLinksNumber : Math.ceil(totalProducts / recordsPerPage)})
 })


  /**---------------------------------------
 * @desc    get one product
 * @route   /api/v1/products/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getOneProduct = asyncHandler(async (req , res) => {
  const product = await ProductModel.findById(req.params.id).populate("reviews");
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
  }

  res.status(200).json(product);
 })


   /**---------------------------------------
 * @desc    get Best Sellers
 * @route   /api/v1/products/bestseller
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getBestSellers = asyncHandler(async (req , res) => {
  const products = await ProductModel.aggregate([
    {$sort : {category : 1 , sales : -1} },
    {$group :{_id : "$category" , doc_with_max_sales : {$first : "$$ROOT"}}},
    {$replaceWith : "$doc_with_max_sales"},
    {$match : {sales : {$gt : 0}}},
    {$project : {_id : 1 , name : 1 , images : 1 , category : 1 , description : 1 }},
    {$limit : 3}
  ])

  res.status(200).json(products);
 })


  /**---------------------------------------
 * @desc    get products for Admin
 * @route   /api/v1/products/admin
 * @method  GET
 * @access  private 
 ----------------------------------------*/
 exports.adminGetAllProducts = asyncHandler(async (req , res) => {
  console.log(req.user);
const products = await ProductModel.find({}).sort({category : 1}).select("name price category");
res.status(200).json(products);
 })

   /**---------------------------------------
 * @desc    Delete Product for Admin
 * @route   /api/v1/products/admin/:id
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 exports.adminDeleteProduct = asyncHandler(async (req , res) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
  }


if (product.images.length > 0) {
      // Get the public ids from the images
        const public_ids = product.images?.map((image) => image.public_id)
      //  Delete all  images from cloudinary that belong to this product
      if (public_ids?.length > 0) {
        await cloudinaryRemoveMultipleImage(public_ids)
      }
}

  product = await ProductModel.findByIdAndDelete(req.params.id);

  res.status(200).json("product deleted successfully");
   })


      /**---------------------------------------
 * @desc    create Product for Admin
 * @route   /api/v1/products/admin
 * @method  POST
 * @access  private 
 ----------------------------------------*/
 exports.adminCreateProduct = asyncHandler(async (req , res) => {
  const {name , description , count , price  , category , atributesTable} = req.body;
const productName = await ProductModel.findOne({name : name});
if (productName) {
  return  res.status(400).json(`product with this name (${name}) already exist`);
}
const product = new ProductModel();
product.name = name;
product.description = description;
product.count = count;
product.price = price;
product.category = category;

if (atributesTable && atributesTable.length > 0) {
  atributesTable.map(attribute => product.atrrs.push(attribute));
}


await product.save();

  res.status(201).json({message : "product created" , product});
   }) 


         /**---------------------------------------
 * @desc    update Product for Admin
 * @route   /api/v1/products/admin/:id
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
 exports.adminUpdateProduct = asyncHandler(async (req , res) => {
  const product = await ProductModel.findById(req.params.id);
  const {name , description , count , price  , category , atributesTable} = req.body;

product.name = name || product.name ;
product.description = description || product.description;
product.count = count || product.count;
product.price = price || product.price;
product.category = category || product.category;

if (atributesTable && atributesTable.length > 0) {
  product.atrrs = [];
  atributesTable.map(attribute => product.atrrs.push(attribute));
} else {
  product.atrrs = [];
}


await product.save();


  res.status(201).json({message : "product Updated" , productId : product._id});
   }) 

         /**---------------------------------------
 * @desc    update Product for Admin
 * @route   /api/v1/products/admin/upload
 * @method  POST
 * @access  private 
 ----------------------------------------*/
 exports.adminUpload = asyncHandler(async (req , res) => {
  if (!req.query.productId) {
    return  res.status(400).json(`insert the product id`);
}
const product =  await ProductModel.findById(req.query.productId);
if (!product) {
  return  res.status(400).json(`this no product with id ${req.query.productId}`);
}


let results = [];

for (let file of req.files) {
  const result =  await cloudinaryUploadImage(file?.path);
results.push(result);
}

let resultsArrayOfObjects = [];
 results.map(oneResult => {
resultsArrayOfObjects.push( {
  url :  oneResult.url,
  public_id : oneResult.public_id
})
})

product.images = resultsArrayOfObjects;
await product.save();
res.status(201).json(product);
 })


         /**---------------------------------------
 * @desc    update Product for Admin
 * @route   /api/v1/products/admin/update
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
 exports.adminUpdateProductImages = asyncHandler(async (req , res) => {

  if (!req.query.productId) {
      return  res.status(400).json(`insert the product id`);
  }
  const product =  await ProductModel.findById(req.query.productId);
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.query.productId}`);
}


if (product.images.length > 0) {
  // Get the public ids from the images
  const public_ids = product.images?.map((image) => image.public_id)
  //  Delete all  images from cloudinary that belong to this product
if (public_ids?.length > 0) {
  await cloudinaryRemoveMultipleImage(public_ids)
}
}

let results = [];

for (let file of req.files) {
  const result =  await cloudinaryUploadImage(file?.path);
results.push(result);
}
console.log("res" ,  results);

let resultsArrayOfObjects = [];
 results.map(oneResult => {
resultsArrayOfObjects.push( {
  url :  oneResult.url,
  public_id : oneResult.public_id
})
})

console.log("ar" ,resultsArrayOfObjects);


product.images = resultsArrayOfObjects;
await product.save();

res.status(201).json(product);

   })