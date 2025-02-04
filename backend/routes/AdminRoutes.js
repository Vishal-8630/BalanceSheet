const express = require("express");
const { getAllAdmins, loginAdmin, signupAdmin, deleteAdmin } = require("../controllers/AdminControllers");

const Router = express.Router();

Router.get("/get-all-admins", getAllAdmins);
Router.post("/login-admin", loginAdmin);
Router.post("/signup-admin", signupAdmin);
Router.delete("/delete-admin/:id", deleteAdmin);

module.exports = Router;