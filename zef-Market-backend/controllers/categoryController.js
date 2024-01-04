const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");


 /**---------------------------------------
 * @desc    get All Categories
 * @route   /api/v1/categories
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllCategories = asyncHandler(async (req , res) => {
  const categories = await CategoryModel.find().sort({name : "asc"}).orFail();

  res.json(categories);
 })

 /**---------------------------------------
 * @desc    get posts count
 * @route   /api/v1/categories
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.createCategory = asyncHandler(async (req , res) => {
const { category} = req.body;
if (!category) {
  res.status(400).send("category is required");
}
const categoryExist = await CategoryModel.findOne({name : category})
if (categoryExist) {
  res.status(400).send("category is already exist");
} else {
  const createdCategory = await CategoryModel.create({
    name :category
  });
  res.status(201).json({data : createdCategory})
}

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
 category = await CategoryModel.findByIdAndDelete(req.params.categoryId);
  res.status(200).json("category deleted succeffuly");
 })

   /**---------------------------------------
 * @desc    save attribute
 * @route   /api/v1/categories/attribute
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 exports.saveAttribute = asyncHandler(async (req , res) => {
  const {key , value , choosenCategoryId} = req.body;
  if (!key || !value , !choosenCategoryId) {
   return  res.status(400).json("all inputs are required");
  }
const category = await CategoryModel.findOne({_id : choosenCategoryId});
if (!category) {
  return  res.status(400).json("ther's no category with this Id");
}

if (category.attrs.length > 0) {

  var keyDoesNotExistInDb = true;
category.attrs.map((attr , index) => {
  if (attr.key === key) {
    keyDoesNotExistInDb = false;
    var attributesValues = [...category.attrs[index].value];
    attributesValues.push(value);
    var newAttributesValues = [...new Set(attributesValues)];
    category.attrs[index].value = newAttributesValues;
  }
})
 
  if (keyDoesNotExistInDb) {
    category.attrs.push({key : key , value : [value]});
  }
  

} else {
  category.attrs.push({key : key , value : [value]});
}
await category.save();
const cat = await CategoryModel.find({}).sort({name : "asc"});
  res.status(201).json({updatedCategory :  cat})
 })