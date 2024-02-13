const DataURIParser = require("datauri/parser");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");



// const photoStorage = multer.diskStorage({
//   filename : function (req , file , cb) {
//   if (file)
//   {
//     cb(null , new Date().toISOString().replace(/:/g , "-") + file.originalname);
//   } else {
//     cb(null , false);
//   }
//   }
// });

const photoStorage = multer.memoryStorage();

const parser = new DataURIParser();

 const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};



  const multerFilter = function(req , file , cb) {
    if(file.mimetype.startsWith("image"))
    {
      cb(null , true);
    } else {
      cb({message : "unsupported file format" } , false)
    }
  }

const photoUpload = multer({storage : photoStorage ,fileFilter : multerFilter , limits :  {fileSize : 1024 * 1024}})

module.exports = {photoUpload , formatImage};