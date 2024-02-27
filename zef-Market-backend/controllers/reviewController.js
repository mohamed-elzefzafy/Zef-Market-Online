const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");
const reviews = require("../seeder/reviews");


            /**---------------------------------------
 * @desc    create Review
 * @route   /api/v1/products/createreview/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 exports.createReview = asyncHandler(async (req , res) => {
  const product = await ProductModel.findById(req.params.productId);
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
}
const user = await UserModel.findById(req.user._id);
  const existUser = product.reviews.find(review => review.user.userId === req.user._id);
  if (existUser) {
    return  res.status(400).json(`your reviewd this product before`);
  }

  const {comment , rating} = req.body;
  if (!comment || !rating ) {
    res.status(400).json(`all fields are required`);
  }

  if ( rating > 5 || rating < 0) {
    res.status(400).json(`rating must be between 0 and 5`);
  }
  
const review = {comment , rating ,
  createdAt : Date.now(),
   user : {
  userId : req.user._id,
  name : req.user.name,
  lastName : user.lastName,
  profilePhoto : user.profilePhoto.url
  
}};

product.reviews.push(review);

// await product.save();

let ratingToatal = 0;

product.reviews.forEach(review => {
 ratingToatal += review.rating
})


 const productRating = (ratingToatal / product.reviews.length);


product.rating = productRating;

await product.save();

res.status(200).json(product);
   })



            /**---------------------------------------
 * @desc    delete Review
 * @route   /api/v1/reviews/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 exports.removeReviewByLoggedUser = asyncHandler(async (req , res) => {
  let product = await ProductModel.findById(req.params.productId)
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
}

const review = product.reviews.find(review => review.user.userId === req.user._id);
const reviewId = review?._id.toString();

if ( !review || reviewId !== req.query.reviewId) {
  return  res.status(400).json(`select the right review`);
}


product = await ProductModel.findByIdAndUpdate({_id :req.params.productId},
  {$pull :{ reviews: {_id : req.query.reviewId}}},
  {new : true}
  )


  let ratingToatal = 0;

  product.reviews.forEach(review => {
   ratingToatal += review.rating
  })
  
  
   const productRating = (ratingToatal / product.reviews.length);
  
  
  product.rating = productRating;
  
  await product.save();


  res.status(200).json(product);
 })


 
            /**---------------------------------------
 * @desc    delete Review
 * @route   /api/v1/reviews/admin/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 exports.removeReviewByAdmin = asyncHandler(async (req , res) => {
  let product = await ProductModel.findById(req.params.productId)
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
}

const review = product.reviews.find(review => review?._id.toString() === req.query.reviewId);

if (!review) {
  return  res.status(400).json(`ther's no review with this id`);
}

product = await ProductModel.findByIdAndUpdate({_id :req.params.productId},
  {$pull :{ reviews: {_id : req.query.reviewId}}},
  {new : true}
  )

  let ratingToatal = 0;

  product.reviews.forEach(review => {
   ratingToatal += review.rating
  })
  
  
   const productRating = (ratingToatal / product.reviews.length);
  
  
  product.rating = productRating;
  
  await product.save();


  res.status(200).json(product);
 })




            /**---------------------------------------
 * @desc    delete Review
 * @route   /api/v1/reviews/updatr-review/:productId
 * @method  PUT
 * @access  private  user
 ----------------------------------------*/
 exports.updateReview = asyncHandler(async (req , res) => {
  let product = await ProductModel.findById(req.params.productId)
  if (!product) {
    return  res.status(400).json(`this no product with id ${req.params.id}`);
}

const review = product.reviews.find(review => review.user.userId === req.user._id);
const reviewId = review?._id.toString();

if ( !review || reviewId !== req.query.reviewId) {
  return  res.status(400).json(`select the right review`);
}

review.comment = req.body.comment || review.comment;
review.rating = req.body.rating || review.rating;





 await product.save();


 let ratingToatal = 0;

 product.reviews.forEach(review => {
  ratingToatal += review.rating
 })
 
 
  const productRating = (ratingToatal / product.reviews.length);
 
 
 product.rating = productRating;
 
 await product.save();

  res.status(201).json(product);
 })









//              /**---------------------------------------
//  * @desc    delete Review
//  * @route   /api/v1/reviews/admin/:productId
//  * @method  PUT
//  * @access  private  user
//  ----------------------------------------*/
//  exports.updateReview = asyncHandler(async (req , res) => {
  
//   let product = await ProductModel.findById(req.params.productId)
//   if (!product) {
//     return  res.status(400).json(`this no product with id ${req.params.id}`);
// }

// const review = product.reviews.find(review => review?._id.toString() === req.query.reviewId);

// if (!review) {
//   return  res.status(400).json(`ther's no review with this id`);
// }

// review.comment = req.body.comment || review.comment;
// review.rating = req.body.rating || review.rating;
//  await product.save();

//   res.status(201).json(product);
//  })

