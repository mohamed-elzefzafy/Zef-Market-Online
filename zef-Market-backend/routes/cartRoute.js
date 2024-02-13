const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const { addToCart, getUserCart } = require("../controllers/cartController");


router.use(verifyIsLoggedIn);
router.route("/:productId").post(addToCart);
router.route("/").get(getUserCart);

module.exports = router;