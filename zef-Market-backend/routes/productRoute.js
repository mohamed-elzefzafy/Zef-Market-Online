const express = require("express");
const { getAllProducts, getOneProduct , getBestSellers , adminGetAllProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload } = require("../controllers/productController");
const router = express.Router();

router.route("/category/:categoryId/search/:searchQuery").get(getAllProducts) ;
router.route("/category/:categoryId").get(getAllProducts) ;
router.route("/search/:searchQuery").get(getAllProducts) ;
router.route("/").get(getAllProducts);
router.route("/bestseller").get(getBestSellers);
router.route("/get-one/:id").get(getOneProduct);

// admin 
router.route("/admin").get(adminGetAllProducts);
router.route("/admin").post(adminCreateProduct);
router.route("/admin/upload").post(adminUpload);
router.route("/admin/:id").delete(adminDeleteProduct);
router.route("/admin/:id").put(adminUpdateProduct);


module.exports = router;