const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const recordsPerPage = require("../config/pagination");
const path = require("path");
const {v4 : uuid4} = require("uuid");
const { cloudinaryUploadImage, cloudinaryRemoveMultipleImage } = require("../utils/cloudinary");
const CategoryModel = require("../models/categoryModel");
const { formatImage } = require("../middleware/photoUploadMiddleWare");


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
// const productCategory = req.params.categoryId || "";

// if (productCategory) {
//   queryCondition = true;
// let a = productCategory.replace("," , "/");
// var regEx = new RegExp("^" + a)
//   categoryQueryCondition = { category : regEx };
// }


if (req.query.category) {
  queryCondition = true;
// let a = req.query.category.split(",").map((item) => {
//   if (item) return new RegExp("^" + item)
// })

  categoryQueryCondition = { category : req.query.category };
}

let attrsQueryCondition = []; 
if (req.query.attrs) {
  attrsQueryCondition = req.query.attrs.split(",").reduce((acc , item) => {
  if (item) {
  let a = item.split("-")
  let values = [...a];
  values.shift();
  let a1 = {
    attrs : {$elemMatch : {key : a[0] , value : {$in : values }}}
  
  }
acc.push(a1);
return acc;
  } else {
    return acc
  }
  } , []);
  queryCondition = true;
}


    //pagination
const pageNum = Number(req.query.page) || 1;

// sortting
let sort = {};
const sortOption = req.query.sort || "";
if (sortOption) {
const newSortOption = sortOption.split("_");
sort = {[newSortOption[0]] : Number(newSortOption[1])}

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
  const product = await ProductModel.findById(req.params.id).populate("reviews")
  .populate("category" , "-description -image  -__v -createdAt -updatedAt");
  if (!product) {
    return  res.status(400).json(`ther's no product with id ${req.params.id}`);
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

  await CategoryModel.populate(products, {path: "category" , select : "name"});
  res.status(200).json(products);
 });
 

  /**---------------------------------------
 * @desc    get products for Admin
 * @route   /api/v1/products/admin
 * @method  GET
 * @access  private 
 ----------------------------------------*/
 exports.adminGetAllProducts = asyncHandler(async (req , res) => {
const products = await ProductModel.find({}).sort({category : 1}).select("name price category images")
.populate("category" , "-description -image  -__v -createdAt -updatedAt");;
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
  const {name , description , count , price  , category , attrKey , attrValue , attrKey2 , attrValue2} = req.body;
  if (!name || !description || !count || !price  || !category) {
    return  res.status(400).json(`complete product fields`);
  }
  // if (!req.files) {
  //   return  res.status(400).json(`one image at least forproduct is required`);
  // }
const productName = await ProductModel.findOne({name : name});
if (productName) {
  return  res.status(400).json(`product with this name (${name}) already exist`);
}
let categoryExist= await CategoryModel.findOne({_id : category});
if (!categoryExist) {
  return  res.status(400).json(`this category not exist`);
}

const product = new ProductModel();
product.name = name;
product.description = description;
product.count = count;
product.price = price;
product.category = category;

if (attrKey !== null  && attrValue != null && attrKey !== "" && attrValue !== "") 
{
  
  if (attrKey && attrValue) {
    const attribute = {
      key : attrKey,
      value : attrValue
      }
  
  product.attrs.push(attribute);
  }else {
    product.attrs =[];
  }

  await product.save();
  
  // category attribute
//   let newCategoriesAttrs =[];
// if (categoryExist.attrs.length > 0)
// {
//    newCategoriesAttrs = categoryExist.attrs;
// } else {
//   newCategoriesAttrs = []
// }
//    newCategoriesAttrs = categoryExist.attrs;
//   let isKeyExist = newCategoriesAttrs.find(attrss => attrss.key === attrKey);
//   if (isKeyExist) 
//   {
//     newCategoriesAttrs = categoryExist.attrs.filter(a => a.key !== attrKey);
//     isKeyExist.value.push(attrValue2);
//     newCategoriesAttrs.push(isKeyExist);
  
//     // let keyExist = categoryExist.attrs.find(a => a.key === attrKey);
  
//     // newCategoriesAttrs.filter(ddd => ddd.key !== keyExist.key);
//     // if (keyExist.value.includes(attrValue))
//     // {
//     //       newCategoriesAttrs.push(keyExist);
//     // } else {
//     //   keyExist.value.push(attrValue);
//     //   newCategoriesAttrs.push(keyExist);
//     // }
  
//     // newCategoriesAttrs.push(keyExist);
//     for (let i = 0; i < newCategoriesAttrs.length; i++) 
//     {
//       newCategoriesAttrs[i].value =  [...new Set(newCategoriesAttrs[i].value)]
//     }
  
  
//     categoryExist.attrs = newCategoriesAttrs;
//   } 
//   else {
//   // newCategoriesAttrs.push({key : attrKey})
//   // let keyFound = newCategoriesAttrs.find(a => a.key === attrKey);
//   // newCategoriesAttrs = newCategoriesAttrs.filter(ddd => ddd.key !== keyFound.key);
//   // keyFound.value.push(attrValue);
//   // newCategoriesAttrs.push(keyFound);
//   let newAttr = {key : attrKey, value : [attrValue]};
//   newCategoriesAttrs.push(newAttr);
//   categoryExist.attrs = newCategoriesAttrs;
//   }
  
//   await categoryExist.save();
//   await product.save();
  

}


if (attrKey2 !== null  && attrValue2 != null && attrKey2 !== "" && attrValue2 !== "") 
{
// attribute 2 
let newCategoriesAttrs2 = categoryExist.attrs; 

if (attrKey2 && attrValue2 &&  attrKey !== attrKey2) {
const atrribute2 = {
  key : attrKey2 ,
  value : attrValue2
}

product.attrs.push(atrribute2);

let existKeyInCategory = categoryExist.attrs.find(k => k.key === attrKey2);


if (existKeyInCategory)
{
newCategoriesAttrs2 = categoryExist.attrs.filter(k => k.key !== attrKey2);
existKeyInCategory.value.push(attrValue2);
newCategoriesAttrs2.push(existKeyInCategory);

} else {
  let att2 = {key : attrKey2 , value : [attrValue2]};
  newCategoriesAttrs2.push(att2);
}


for (let i = 0; i < newCategoriesAttrs2.length; i++) 
{
  newCategoriesAttrs2[i].value =  [...new Set(newCategoriesAttrs2[i].value)]
}


categoryExist.attrs = newCategoriesAttrs2;
  


await product.save();
await categoryExist.save();

}
}







// start 

let results = [];


const files = req.files.map(file => formatImage(file));


for (let file of files) {
  const result =  await cloudinaryUploadImage(file);
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
if (product.images.length === 0)
{
  return  res.status(400).json(`one image at least for product is required`);
}


await product.save();

// end 


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
  if (!product) {
    return res.status(400).json("No product with id " + req.params.id);
  }
  const {name , description , count , price  , category , attrKey ,  attrValue  , attrKey2 , attrValue2} = req.body;

product.name = name || product.name ;
product.description = description || product.description;
product.count = count || product.count;
product.price = price || product.price;
product.category = category || product.category;

const existAttribute = product.attrs.find(attribute => attribute.key === attrKey);
let newProductAttrs = product.attrs

if (attrKey && attrValue) {

  if (existAttribute) {
    newProductAttrs = product.attrs.filter(a => a.key !== attrKey);
  }

  const attribute = {
    key : attrKey,
    value : attrValue
    }

newProductAttrs.push(attribute);
product.attrs = newProductAttrs;
}else {
  product.attrs = product.attrs;
}


await product.save();



// category attribute
// let categoryExist = await CategoryModel.findById(product.category._id)
// let newCategoriesAttrs = categoryExist.attrs;
// const isKeyExist = newCategoriesAttrs.find(attrss => attrss.key === attrKey);
// if (isKeyExist) 
// {
//   let keyExist = categoryExist.attrs.find(a => a.key === attrKey);

//   newCategoriesAttrs.filter(ddd => ddd.key !== keyExist.key);
//   if (keyExist.value.includes(attrValue))
//   {
//         newCategoriesAttrs.push(keyExist);
//   } else {
//     keyExist.value.push(attrValue);
//     newCategoriesAttrs.push(keyExist);
//   }

//   newCategoriesAttrs.push(keyExist);
//   for (let i = 0; i < newCategoriesAttrs.length; i++) 
//   {
//     newCategoriesAttrs[i].value =  [...new Set(newCategoriesAttrs[i].value)]
//   }


//   categoryExist.attrs = newCategoriesAttrs;
// } 
// else {
// newCategoriesAttrs.push({key : attrKey})
// let keyFound = newCategoriesAttrs.find(a => a.key === attrKey);
// newCategoriesAttrs = newCategoriesAttrs.filter(ddd => ddd.key !== keyFound.key);
// keyFound.value.push(attrValue);
// newCategoriesAttrs.push(keyFound);
// categoryExist.attrs = newCategoriesAttrs;
// }



// aaaaaaaaaaaaaaa

// category attribute
let categoryExist = await CategoryModel.findById(product.category._id)
// let newCategoriesAttrs =[];
// if (categoryExist.attrs.length > 0)
// {
//    newCategoriesAttrs = categoryExist.attrs;
// } else {
//   newCategoriesAttrs = []
// }
// let isKeyExist = newCategoriesAttrs.find(attrss => attrss.key === attrKey);
// if (isKeyExist) 
// {
//   newCategoriesAttrs = categoryExist.attrs.filter(a => a.key !== attrKey);
//   isKeyExist.value.push(attrValue2);
//   newCategoriesAttrs.push(isKeyExist);

//   // let keyExist = categoryExist.attrs.find(a => a.key === attrKey);

//   // newCategoriesAttrs.filter(ddd => ddd.key !== keyExist.key);
//   // if (keyExist.value.includes(attrValue))
//   // {
//   //       newCategoriesAttrs.push(keyExist);
//   // } else {
//   //   keyExist.value.push(attrValue);
//   //   newCategoriesAttrs.push(keyExist);
//   // }

//   // newCategoriesAttrs.push(keyExist);
//   for (let i = 0; i < newCategoriesAttrs.length; i++) 
//   {
//     newCategoriesAttrs[i].value =  [...new Set(newCategoriesAttrs[i].value)]
//   }


//   categoryExist.attrs = newCategoriesAttrs;
// } 
// else {
// // newCategoriesAttrs.push({key : attrKey})
// // let keyFound = newCategoriesAttrs.find(a => a.key === attrKey);
// // newCategoriesAttrs = newCategoriesAttrs.filter(ddd => ddd.key !== keyFound.key);
// // keyFound.value.push(attrValue);
// // newCategoriesAttrs.push(keyFound);
// let newAttr = {key : attrKey, value : [attrValue]};
// newCategoriesAttrs.push(newAttr);
// categoryExist.attrs = newCategoriesAttrs;
// }

// await categoryExist.save();
await product.save();




// attribute 2 
let newCategoriesAttrs2 = categoryExist.attrs; 
const existAttribute2 = product.attrs.find(attribute => attribute.key === attrKey2);
let = newProductAttrs2 = product.attrs;
if (attrKey2 && attrValue2 &&  attrKey !== attrKey2) {
  if (existAttribute2) {
    newProductAttrs2 = product.attrs.filter(attribute => attribute.key !== attrKey2);
  }
const atrribute2 = {
  key : attrKey2 ,
  value : attrValue2
}
newProductAttrs2.push(atrribute2);

product.attrs = newProductAttrs2

let existKeyInCategory = categoryExist.attrs.find(k => k.key === attrKey2);


if (existKeyInCategory)
{
newCategoriesAttrs2 = categoryExist.attrs.filter(k => k.key !== attrKey2);
existKeyInCategory.value.push(attrValue2);
newCategoriesAttrs2.push(existKeyInCategory);

} else {
  let att2 = {key : attrKey2 , value : [attrValue2]};
  newCategoriesAttrs2.push(att2);
}


for (let i = 0; i < newCategoriesAttrs2.length; i++) 
{
  newCategoriesAttrs2[i].value =  [...new Set(newCategoriesAttrs2[i].value)]
}

categoryExist.attrs = newCategoriesAttrs2;
  


await product.save();
await categoryExist.save();

}
// aaaaaaaaaaaaaaa





// if (atributesTable && atributesTable.length > 0) {
//   product.atrrs = [];
//   atributesTable.map(attribute => product.atrrs.push(attribute));
// } else {
//   product.atrrs = [];
// }


// await product.save();


  // res.status(201).json({message : "product Updated" , productId : product._id});
  res.status(201).json({message : "product Updated" ,  product});
  // res.status(201).json(product);
   }) 


            /**---------------------------------------
 * @desc    delete product attribute
 * @route   /api/v1/products/attribute/admin/:id
 * @method  DELETE
 * @access  private 
 ----------------------------------------*/
 exports.adminDeleteProductAtribute = asyncHandler(async (req , res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product)
  {
    return res.status(400).json("No product with id " + req.params.id); 
  }

  const existAttr = product.attrs.find(a => a.key === req.body.attribute);
  if (!existAttr) {
    return res.status(400).json("this attribute not exist"); 
  }
  let newproductAttr = product.attrs;

  newproductAttr = product.attrs.filter(a => a.key !== req.body.attribute);

  product.attrs = newproductAttr;

  await product.save();

  res.status(201).json(product);
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
const files = req.files.map(file => formatImage(file));

for (let file of files) {
  const result =  await cloudinaryUploadImage(file);
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

  if (!req.params.id) {
      return  res.status(400).json(`insert the product id`);
  }
  const product =  await ProductModel.findById(req.params.id);
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

let results = [];


const files = req.files.map(file => formatImage(file));

for (let file of files) {
  const result =  await cloudinaryUploadImage(file);
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
 * @desc    remove One Image for Admin
 * @route   /api/v1/products/admin/removeimage/:id
 * @method  PUT
 * @access  private 
 ----------------------------------------*/
 exports.removeOneImage = asyncHandler(async (req , res) => {

  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
}



const  imageId  = product.images.find(img =>  img.public_id === req.body.publicId);

if (!imageId) {
  return  res.status(400).json(`this image not exists`);
}

product = await ProductModel.findOneAndUpdate({_id : req.params.id} ,{$pull :
   {images : {public_id : req.body.publicId}}} , {new : true});

   await cloudinaryRemoveMultipleImage(imageId.public_id)

res.status(200).json(product)
 })


 



