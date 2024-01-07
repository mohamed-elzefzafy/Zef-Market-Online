const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");


 /**---------------------------------------
 * @desc    get all users
 * @route   /api/v1/users
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllusers = asyncHandler(async (req , res) => {
  const users = await UserModel.find({}).select("-password");
  res.status(200).json(users)
 })


 /**---------------------------------------
 * @desc    register user
 * @route   /api/v1/users
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

const user = await UserModel.create({
  name , lastName , email : email.toLowerCase() ,
  password : hashedPassword
})

const token =  generateAuthToken(user._id , user.name , user.lastName , user.email , user.isAdmin);

res
.cookie("access token", token , {
  httpOnly : true,
  secure : process.env.NODE_ENV === "production",
  sameSite : "strict",
})
.status(201).json({success : "user created" , 
createdUser : {
  _id : user._id ,
  name : user.name ,
  lastName : user.lastName ,
  email : user.email ,
  isAdmin : user.isAdmin,
  profilePhoto : user.profilePhoto
}
});
 })