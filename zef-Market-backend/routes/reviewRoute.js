const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin, verifyUserNotAdmin } = require("../middleware/verifyAuthToken");
const { createReview, removeReviewByLoggedUser, removeReviewByAdmin, updateReview } = require("../controllers/reviewController");


// user 
router.use(verifyIsLoggedIn);
router.route("/:productId").put(verifyUserNotAdmin , createReview)
router.route("/delete-review/:productId").put(verifyUserNotAdmin , removeReviewByLoggedUser);
router.route("/update-review/:productId").put(verifyUserNotAdmin , updateReview);
// admin 
router.use(verifyIsAdmin);
router.route("/delete-review/admin/:productId").put(removeReviewByAdmin);

module.exports = router;