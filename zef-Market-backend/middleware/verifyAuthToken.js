const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


exports.verifyIsLoggedIn =   asyncHandler(async (req , res , next) => {
  next();
  return
const token = req.cookies.access_token;

if (!token) {
  return  res.status(403).json("token is required for the authentication");
}

try {
  const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
  req.user = decoded;
  next();
} catch (error) {
  return  res.status(401).json("unauthorized invalid token");
}

})

exports.verifyIsAdmin =   asyncHandler(async (req , res , next) => {
  next();
  return
  if (req.user && req.user.isAdmin){
    next();
  } else {
    return  res.status(401).json("unauthorized Admin requird");
  }
})



exports.verifyUserNotAdmin =   asyncHandler(async (req , res , next) => {
  next();
  return
  if (req.user.isAdmin){
    return  res.status(401).json("admin can't access this route");
  } else if (req.user) {
    next();
  }

})


