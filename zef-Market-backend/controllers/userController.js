const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const bcrypt = require("bcryptjs");
const ProductModel = require("../models/productModel");
const ReviewModel = require("../models/reviewModel");
const reviews = require("../seeder/reviews");
const { cloudinaryRemoveImage, cloudinaryUploadImage } = require("../utils/cloudinary");
const objectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const { formatImage } = require("../middleware/photoUploadMiddleWare");
const { resizeImages } = require("../utils/resizeImages");


 /**---------------------------------------
 * @desc    get all users
 * @route   /api/v1/users
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllusers = asyncHandler(async (req , res) => {
  const users = await UserModel.find({}).sort({"isAdmin" : "desc"}).select("-password");
  res.status(200).json(users)
 })


 /**---------------------------------------
 * @desc    register user
 * @route   /api/v1/users/register
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 exports.registerUser = asyncHandler(async (req , res) => {
  const {name , lastName , email ,  password} = req.body;
if (!name || !lastName || !email || !password) {
return  res.status(400).json("all fields required");
}

const userExist = await UserModel.findOne({email : email});
if (userExist)
{
return  res.status(400).json("this user is already exist");
}

const hashedPassword =  hashPassword(password);

let user = await UserModel.create({
  name , lastName , email : email.toLowerCase() ,
  password : hashedPassword
})

if (req.file) {
  const file = formatImage(req.file);
    //  Get the user from DB
    // const user = await UserModel.findById(req.user._id);
  if (user.profilePhoto.public_Id !== null)
  {
  await  cloudinaryRemoveImage(user.profilePhoto.public_Id);
  }

  // upload the photo to cloudinary
  const result = await cloudinaryUploadImage(file);

  //  Change the profilePhoto field in the DB
  user.profilePhoto = {
    url : result.secure_url,
    public_Id : result.public_id
  }

  await user.save();
  // 7. Send response to client


}

const token =  generateAuthToken(user._id , user.name , user.lastName , user.email , user.isAdmin , user.isBlocked);

res
.cookie("access_token", token , {
  // httpOnly : true,
  // secure : process.env.NODE_ENV === "production",
  sameSite : "strict",
})
.status(201).json({success : "user created" , 
createdUser : {
  _id : user._id ,
  name : user.name ,
  lastName : user.lastName ,
  email : user.email ,
  isAdmin : user.isAdmin,
  profilePhoto : user.profilePhoto,
  phoneNumber : user.phoneNumber,
  address : user.address,
  country : user.country,
  zipCode : user.zipCode,
  city  :user.city,
  state : user.state,
  isBlocked : user.isBlocked,
}
});
 })


  /**---------------------------------------
 * @desc    login user
 * @route   /api/v1/users/login
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 exports.loginUser = asyncHandler(async (req , res) => {
  const {  email ,  password , doNotLogout} = req.body;
if (!email || !password) {
return  res.status(400).json("all fields required");
}

const user = await UserModel.findOne({email : email});

if (!user)
{
return  res.status(400).json("wrong email or password");
}


const validePassword = comparePassword(password  , user.password); 

if (!validePassword) {
  return  res.status(400).json("wrong email or password");
}

let cookieParam = {
  // httpOnly : true,
  // secure : process.env.NODE_ENV !== "production",
  sameSite : "strict",
}

if (doNotLogout) {
  cookieParam = {...cookieParam , maxAge : 1000 * 60 * 60 * 24 * 7}
}
const token =  generateAuthToken(user._id , user.name , user.lastName , user.email , user.isAdmin , user.isBlocked);


res.cookie("access_token" , token , cookieParam ).status(200).json({success: "user logged in successfully" , 
loggedUser :  {
  _id : user._id ,
  name : user.name ,
  lastName : user.lastName ,
  email : user.email ,
  isAdmin : user.isAdmin,
  profilePhoto : user.profilePhoto,
  phoneNumber : user.phoneNumber,
  address : user.address,
  country : user.country,
  zipCode : user.zipCode,
  city  :user.city,
  state : user.state,
  isBlocked : user.isBlocked,
  doNotLogout
}
})
 })


   /**---------------------------------------
 * @desc     update User Profile
 * @route   /api/v1/users/profile
 * @method  PUT
 * @access  private -- logedUser 
 ----------------------------------------*/
 exports.updateUserProfile = asyncHandler(async (req , res) => {
  const user = await UserModel.findById(req.user._id);
  user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;

if (req.body.password && req.body.password != user.password) {
  user.password = hashPassword(req.body.password);
}
    await user.save();

    res.status(200).json({success : "user updated" , 
    updatedUser :  {
      _id : user._id ,
      name : user.name ,
      lastName : user.lastName ,
      email : user.email ,
      isAdmin : user.isAdmin,
      profilePhoto : user.profilePhoto,
      phoneNumber : user.phoneNumber,
      address : user.address,
      country : user.country,
      zipCode : user.zipCode,
      city  :user.city,
      state : user.state

    }})
 })


   /**---------------------------------------
 * @desc     get User Profile
 * @route   /api/v1/users/profileDetails
 * @method  GET
 * @access  private -- logedUser 
 ----------------------------------------*/
 exports.getUserProfile = asyncHandler(async (req , res) => {
  const user = await UserModel.findById(req.user._id);

  if (!user) {
    return  res.status(400).json("user not found");
  }

  res.status(200).json(user);
 })

    /**---------------------------------------
 * @desc     write Review
 * @route   /api/v1/users/review/:productId
 * @method  GET
 * @access  private -- logedUser 
 ----------------------------------------*/
 exports.writeReview = asyncHandler(async (req , res) => {

  // const session = await ReviewModel.startSession();

  const {comment , rating} = req.body;
  if (!(comment && rating)) {
    return  res.status(400).json("all fields required"); 
  }




 const product = await ProductModel.findById(req.params.productId).populate("reviews")
//  .session(session);
if (!product) {
  return  res.status(400).json("product not found"); 
}


const existUser = product.reviews.find((review) => review.user._id.toString() === req.user._id.toString());
if (existUser) {
  // await session.abortTransaction();
  // session.endSession();
  return  res.status(400).json("you reviewd this produt before"); 
}

let reviewId = new objectId();

// session.startTransaction();
await ReviewModel.create([
  {
  _id : reviewId,
  comment : comment,
  rating : Number(rating),
  user :{ _id : req.user._id  , name : req.user.name + " " + req.user.lastName}
 }] ,/* {session : session}*/) 


let prc = [...product.reviews];
prc.push({rating : rating});
product.reviews.push(reviewId);

if (product.reviews.length === 1) {
  product.rating = rating;
  product.reviewsNumber = 1
} else {
  product.reviewsNumber = product.reviews.length;
  product.rating = prc.map(item => Number(item.rating)).reduce((sum , item) =>  sum + item , 0) / product.reviews.length;

  console.log(product.rating);
}

await product.save();

// await session.commitTransaction();
// session.endSession();

 res.status(200).json("review created");
 })



   /**---------------------------------------
 * @desc    profile photo upload
 * @route   /api/v1/users/profile/upload-image-profile
 * @method  POST
 * @access  private (only logged user)
 ----------------------------------------*/
 exports.profilePhotoUploadOrUpdate = asyncHandler(async (req, res , next) => {
  // 1. Validation
  if (!req.file)
  {
    return res.status(400).json({message : "no file provided"});
  }
  
  const file = formatImage(req.file);


    //  Get the user from DB
    const user = await UserModel.findById(req.user._id);
  if (user.profilePhoto.public_Id !== null)
  {
  await  cloudinaryRemoveImage(user.profilePhoto.public_Id);
  }

  // upload the photo to cloudinary
  const result = await cloudinaryUploadImage(file);

  //  Change the profilePhoto field in the DB
  user.profilePhoto = {
    url : result.secure_url,
    public_Id : result.public_id
  }

  await user.save();
  // 7. Send response to client
  res.status(201).json({message : "your profile photo uploaded successfully",
  loggedUser :  {
    _id : user._id ,
    name : user.name ,
    lastName : user.lastName ,
    email : user.email ,
    isAdmin : user.isAdmin,
    profilePhoto : user.profilePhoto ,
  }
});
 })


    /**---------------------------------------
 * @desc     get User 
 * @route   /api/v1/users/:id
 * @method  GET
 * @access  private -- admin 
 ----------------------------------------*/
 exports.getUser = asyncHandler(async (req , res) => {
  const user = await UserModel.findById(req.params.id).select("name lastName email isAdmin profilePhoto isBlocked");

  if (!user) {
    return  res.status(400).json("user not found");
  }

  res.status(200).json(user);
 })

    /**---------------------------------------
 * @desc     update User 
 * @route   /api/v1/users/:id
 * @method  PUT
 * @access  private -- admin 
 ----------------------------------------*/
 exports.updateUser = asyncHandler(async (req , res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return  res.status(400).json("user not found");
  }

  user.name     = req.body.name || user.name;
  user.lastName = req.body.lastName || user.lastName;
  user.email    = req.body.email || user.email;
  user.isAdmin  = req.body.isAdmin || user.isAdmin;

  await user.save();

  res.status(200).json("user updated");
 });

     /**---------------------------------------
 * @desc     delete User 
 * @route   /api/v1/users/:id
 * @method  DELETE
 * @access  private -- admin 
 ----------------------------------------*/
 exports.deleteUser = asyncHandler(async (req , res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return  res.status(400).json("user not found");
  }

  if (user.profilePhoto.public_Id !== null) 
  {
     await cloudinaryRemoveImage(user.profilePhoto.public_Id);
  }

await UserModel.findByIdAndDelete(req.params.id);
  res.status(200).json("user deleted");
 });


      /**---------------------------------------
 * @desc     get Token
 * @route   /api/v1/users/auth/get-token
 * @method  GET
 * @access public
 ----------------------------------------*/
 exports.getToken = async (req , res) => {

  const token = req.cookies.access_token;
if (!token) {
  return  res.status(403).json("token is required for the authentication");
}

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
    return  res.json({token : decoded.name , isAdmin : decoded.isAdmin , isBlocked : decoded.isBlocked})
  } catch (error) {
    return res.status(401).json("unauthorized invalid token");
  }
 }


       /**---------------------------------------
 * @desc     logOut
 * @route   /api/v1/users/logout
 * @access public
 ----------------------------------------*/
 exports.logOut = async (req , res) => {
if (!req.cookies.access_token) {
  return  res.status(400).json("you are already log out");
}
  try {
res.clearCookie("access_token").json("acces token cleared");
  } catch (error) {
    return  res.status(400).json("there is error");
  }
 }


      /**---------------------------------------
 * @desc     toggle block user 
 * @route   /api/v1/users/toggle-block/:id
 * @method  PUT
 * @access  private -- admin 
 ----------------------------------------*/
 exports.toggleBlockUser  = asyncHandler(async (req , res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return  res.status(400).json("user not found");
  }
  if (user.isAdmin) {
    return  res.status(400).json("you can.t Block Admin user");
  }


  if (user.isBlocked) {
   user.isBlocked = false;

   await user.save();

   res.status(200).json("user Not Blocked");
  } else {
    user.isBlocked = true;

    await user.save();

    res.status(200).json("user Blocked");
  }
 })