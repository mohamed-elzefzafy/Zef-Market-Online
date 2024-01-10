const express = require("express");
const { getAllCategories, createCategory, deleteCategory, saveAttribute } = require("../controllers/categoryController");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const router = express.Router();





router.route("/").get(getAllCategories);

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.route("/").post(createCategory);
router.route("/:categoryId").delete(deleteCategory);
router.route("/attribute").put(saveAttribute);


module.exports = router;