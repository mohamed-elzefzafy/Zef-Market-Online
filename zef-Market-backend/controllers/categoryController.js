const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImage } = require("../utils/cloudinary");
const { formatImage } = require("../middleware/photoUploadMiddleWare");
const ProductModel = require("../models/productModel");


 /**---------------------------------------
 * @desc    get All Categories
 * @route   /api/v1/categories
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllCategories = asyncHandler(async (req , res) => {
  const categories = await CategoryModel.find().sort({name : "asc"});

  res.json(categories);
 })


  /**---------------------------------------
 * @desc    get one Category
 * @route   /api/v1/categories/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getOneCategory = asyncHandler(async (req , res) => {
  const category = await CategoryModel.findById(req.params.id);

  res.json(category);
 })


 /**---------------------------------------
 * @desc    get posts count
 * @route   /api/v1/categories
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.createCategory = asyncHandler(async (req , res) => {
const { name , description } = req.body;
if (!name || !description) {
  res.status(400).json("category is required");
}
const categoryExist = await CategoryModel.findOne({name : name})
if (categoryExist) {
  res.status(400).json("category is already exist");
}

if (!req.file) {
  res.status(400).json("category image is required");
}

let image = {};


let file = formatImage(req.file)
// upload the photo to cloudinary
const result = await cloudinaryUploadImage(file);

//  Change the profilePhoto field in the DB
image = {
  url : result.secure_url,
  public_Id : result.public_id
}


  const createdCategory = await CategoryModel.create({
    name :name,
    description : description,
    image : image,
  });
  
  res.status(201).json(createdCategory)


 })

  /**---------------------------------------
 * @desc    delete Category
 * @route   /api/v1/categories/:categoryId
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 exports.deleteCategory = asyncHandler(async (req , res) => {
  let category = await CategoryModel.findById(req.params.categoryId);
  if (!category) {
    res.status(400).json("ther's no category with this Id");
  }
  if (category.image.public_Id) 
  {
     await cloudinaryRemoveImage(category.image.public_Id);
  }

  const productsForCategory = await ProductModel.find({category : req.params.categoryId});
// const publicIds = productsForCategory.map(product => product.images.public_id);
// let publicIds = [];

let publicIds = productsForCategory.map(product => product.images.map(image => image.public_id))


if (publicIds?.length > 0) {
  for(let i = 0; i< publicIds.length ; i++)
  {
    await cloudinaryRemoveMultipleImage(publicIds[i])
  }
  
}

  await ProductModel.deleteMany({category : req.params.categoryId});

 category = await CategoryModel.findByIdAndDelete(req.params.categoryId);
  res.status(200).json({message : "Category deleted successfully" , categoryId : req.params.categoryId});

 })

 
//    /**---------------------------------------
//  * @desc    save attribute
//  * @route   /api/v1/categories/attribute
//  * @method  DELETE
//  * @access  private 
//  ----------------------------------------*/
//  exports.saveAttribute = asyncHandler(async (req , res) => {
//   const {key , value , choosenCategoryId} = req.body;
//   if (!key || !value || !choosenCategoryId) {
//    return  res.status(400).json("all inputs are required");
//   }
// const category = await CategoryModel.findOne({_id : choosenCategoryId});
// if (!category) {
//   return  res.status(400).json("ther's no category with this Id");
// }

// if (category.attrs.length > 0) {

//   var keyDoesNotExistInDb = true;
// category.attrs.map((attr , index) => {
//   if (attr.key === key) {
//     keyDoesNotExistInDb = false;
//     var attributesValues = [...category.attrs[index].value];
//     attributesValues.push(value);
//     var newAttributesValues = [...new Set(attributesValues)];
//     category.attrs[index].value = newAttributesValues;
//   }
// })
 
//   if (keyDoesNotExistInDb) {
//     category.attrs.push({key : key , value : [value]});
//   }
  

// } else {
//   category.attrs.push({key : key , value : [value]});
// }
// await category.save();
// const cat = await CategoryModel.find({}).sort({name : "asc"});
//   res.status(201).json({updatedCategory :  cat})
//  })


