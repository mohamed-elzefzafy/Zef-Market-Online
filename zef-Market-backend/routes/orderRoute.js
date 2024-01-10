const express = require("express");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUserOrders, getOneOrder } = require("../controllers/orderController");
const router = express.Router();


// user loggedIn routes
router.use(verifyIsLoggedIn);
router.route("/").get(getUserOrders);
router.route("/user/:id").get(getOneOrder);

// admin routes
router.use(verifyIsAdmin);
// router.route("/").get(getUserOrders)

module.exports = router;