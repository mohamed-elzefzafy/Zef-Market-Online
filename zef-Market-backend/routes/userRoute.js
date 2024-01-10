const express = require("express");
const { getAllusers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, profilePhotoUploadOrUpdate, getUser, updateUser, deleteUser } = require("../controllers/userController");
const { verifyIsAdmin, verifyIsLoggedIn, verifyUserNotAdmin } = require("../middleware/verifyAuthToken");
const photoUpload = require("../middleware/photoUploadMiddleWare");
const router = express.Router();



router.route("/register").post(registerUser); 
router.route("/login").post(loginUser); 

// user loggedIn routes
router.use(verifyIsLoggedIn);
router.route("/profile").put(updateUserProfile);
router.route("/profile/upload-image-profile").post(photoUpload.single("profilePhoto") , profilePhotoUploadOrUpdate);
router.route("/profileDetails").get(getUserProfile);
router.route("/review/:productId").post( verifyUserNotAdmin , writeReview);

// admin routes
router.use(verifyIsAdmin);
router.route("/").get(getAllusers);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;