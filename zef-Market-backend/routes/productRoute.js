const express = require("express");
const { getAllProducts, getOneProduct , getBestSellers , adminGetAllProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminUpdateProductImages } = require("../controllers/productController");
const router = express.Router();
const photoUpload = require("../middleware/photoUploadMiddleWare");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");

router.route("/category/:categoryId/search/:searchQuery").get(getAllProducts) ;
router.route("/category/:categoryId").get(getAllProducts) ;
router.route("/search/:searchQuery").get(getAllProducts) ;
router.route("/").get(getAllProducts);
router.route("/bestseller").get(getBestSellers);
router.route("/get-one/:id").get(getOneProduct);

// admin 
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.route("/admin").get(adminGetAllProducts);
router.route("/admin").post(adminCreateProduct);
router.route("/admin/upload").post(photoUpload.array("images" , 3) ,  adminUpload);
router.route("/admin/update").put(photoUpload.array("images" , 3) ,  adminUpdateProductImages);
router.route("/admin/:id").delete(adminDeleteProduct);
router.route("/admin/:id").put(adminUpdateProduct);


module.exports = router;