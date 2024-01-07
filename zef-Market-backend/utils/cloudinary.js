const cloudinary = require("cloudinary");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// cloudinary upload image
const cloudinaryUploadImage = async(fileUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileUpload , {  resource_type : "auto"  }  , {
      folder: "Zef-Market",
    })
    return data;
    
  } catch (error) {
    console.log(error);
  throw new Error("internal server error cloudinary" )
  }
}

// cloudinary Remove image
const cloudinaryRemoveImage = async(ImagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(ImagePublicId)
    return result;
    
  } catch (error) {
    console.log(error);
    throw new Error("internal server error cloudinary" )
  }
}



// cloudinary Remove multiple image
const cloudinaryRemoveMultipleImage = async(publicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds)
    return result;
    
  } catch (error) {
    console.log(error);
    throw new Error("internal server error cloudinary" )
  }
}


module.exports = { cloudinaryUploadImage , cloudinaryRemoveImage , cloudinaryRemoveMultipleImage}





