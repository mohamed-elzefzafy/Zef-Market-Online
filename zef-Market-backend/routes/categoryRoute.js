const express = require("express");
const { getAllCategories, createCategory, deleteCategory, saveAttribute } = require("../controllers/categoryController");
const router = express.Router();


router.route("/").get(getAllCategories).post(createCategory);
router.route("/:categoryId").delete(deleteCategory);
router.route("/attribute").put(saveAttribute);


module.exports = router;