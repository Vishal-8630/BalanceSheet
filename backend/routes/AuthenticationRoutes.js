const express = require("express");
const { loginUser, registerUser, logoutUser, verifyOtp } = require("../controllers/AuthenticationControllers");

const Router = express.Router();

Router.post("/login", loginUser);
Router.post("/register", registerUser);
Router.post("/verify-otp", verifyOtp);
Router.post("/logout", logoutUser);

module.exports = Router;