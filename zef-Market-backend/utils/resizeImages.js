// exports.resizeImages = async(req , res , next) => {
//   if (req.files) {
//     for ( file of req.files) {
//       await  sharp(file.buffer).resize(600 , 600)
//       .toFormat("jpeg").jpeg({quality : 90})

const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

//     }

//   }else if (req.file) {
//     await  sharp(req.file.buffer).resize(600 , 600)
//     .toFormat("jpeg").jpeg({quality : 90})
//   }
//   next();
// }


// exports.resizeImages = asyncHandler(async (req , res , next) => {
// if (req.file) {
//   await  sharp(req.file.buffer).resize(600 , 600)
//  .toFormat("jpeg").jpeg({quality : 90})

// }
//  next();
// }
// )


exports.resizeImages = asyncHandler(async (req , res , next) => {
  if (req.file) {
    await  sharp(req.file.buffer).resize(600 , 600)
   .toFormat("jpeg").jpeg({quality : 90})
  
  }
   next();
  }
  )
  