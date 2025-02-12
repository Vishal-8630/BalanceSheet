const express = require("express");
const { loginUser, registerUser, logoutUser, verifyOtp, updateUser } = require("../controllers/UserControllers");

const Router = express.Router();

Router.post("/login", loginUser);
Router.post("/register", registerUser);
Router.post("/verify-otp", verifyOtp);
Router.post("/update-user/:id", updateUser);
Router.post("/logout", logoutUser);

module.exports = Router;