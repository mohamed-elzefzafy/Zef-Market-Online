const express = require("express");
const { getAllCategories, createCategory, deleteCategory, saveAttribute, getOneCategory } = require("../controllers/categoryController");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const {photoUpload} = require("../middleware/photoUploadMiddleWare");
const router = express.Router();





router.route("/").get(getAllCategories);

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.route("/").post(photoUpload.single("image") , createCategory);
router.route("/:id").get(getOneCategory);
router.route("/:categoryId").delete(deleteCategory);
// router.route("/attribute").put(saveAttribute);


module.exports = router;