const express = require("express");
const router = express.Router();

const signup = require("../controllers/auth/signup");
const login = require("../controllers/auth/login");

router.post("/login", login);
router.post("/signup", signup);

//figure out best logout practices
// router.get("/logout", logout);

module.exports = router; 
