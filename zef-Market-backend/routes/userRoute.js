const express = require("express");
const { getAllusers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, profilePhotoUploadOrUpdate, getUser, updateUser, deleteUser, getToken, logOut, toggleBlockUser } = require("../controllers/userController");
const { verifyIsAdmin, verifyIsLoggedIn, verifyUserNotAdmin } = require("../middleware/verifyAuthToken");
const { photoUpload } = require("../middleware/photoUploadMiddleWare");
const { resizeImages } = require("../utils/resizeImages");
// const photoUpload = require("../middleware/photoUploadMiddleWare");
const router = express.Router();



router.route("/register").post(photoUpload.single("profilePhoto") , registerUser); 
router.route("/login").post(loginUser); 
router.route("/auth/get-token").get(getToken); 
router.route("/logout").get(logOut); 

// user loggedIn routes
router.use(verifyIsLoggedIn);
router.route("/profile").put(updateUserProfile);
router.route("/profile/upload-image-profile").post(  photoUpload.single("profilePhoto") , profilePhotoUploadOrUpdate);
router.route("/profileDetails").get(getUserProfile);
router.route("/review/:productId").post( verifyUserNotAdmin , writeReview);

// admin routes
router.use(verifyIsAdmin);
router.route("/").get(getAllusers);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/toggle-block/:id").put(toggleBlockUser);

module.exports = router;