const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const { addToCart, getUserCart  , removeProductFromCart, clearCart} = require("../controllers/cartController");


router.use(verifyIsLoggedIn);
router.route("/:productId").post(addToCart);
router.route("/remove-product/:productId").put(removeProductFromCart);
router.route("/clear-cart/:cartId").put(clearCart);
router.route("/").get(getUserCart);

module.exports = router;