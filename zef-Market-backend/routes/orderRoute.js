const express = require("express");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const { getUserOrders, getOneOrder, createOrder, updateOrderToPaid, updateOrderToDeliverd, getOrdersByAdmin, getOrdersForAnalysis } = require("../controllers/orderController");
const router = express.Router();


// user loggedIn routes
router.use(verifyIsLoggedIn);
router.route("/").get(getUserOrders);
router.route("/").post(createOrder);
router.route("/user/:id").get(getOneOrder);
router.route("/paid/:id").put(updateOrderToPaid);


// admin routes
router.use(verifyIsAdmin);
router.route("/delivered/:id").put(updateOrderToDeliverd);
router.route("/admin").get(getOrdersByAdmin);
router.route("/analysts/:date").get(getOrdersForAnalysis);

module.exports = router;