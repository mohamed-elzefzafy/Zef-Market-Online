const express = require("express");
const { getAllusers, registerUser } = require("../controllers/userController");
const router = express.Router();



router.route("/register").post(registerUser);

// user loggedIn routes


// admin routes
router.route("/").get(getAllusers);

module.exports = router;