const express = require("express");
const registerUser = require("../controllers/userController");

const router = express.Router();
router.post("/register", registerUser.registerUser);
router.post("/login", registerUser.loginUser);

module.exports = router;
