const express = require("express");
const { addBalanceSheet, getAllBalanceSheet, deleteBalanceSheet, getBalanceSheetById, updateBalanceSheet } = require("./../controllers/BalanceSheetControllers");
const { default: verifyToken } = require("../middlewares/authMiddleware");

const Router = express.Router();

Router.post("/add-balance-sheet", verifyToken, addBalanceSheet);
Router.get("/get-all-balance-sheet", getAllBalanceSheet);
Router.delete("/delete-balance-sheet/:id", verifyToken, deleteBalanceSheet);
Router.get("/get-balance-sheet/:id", getBalanceSheetById);
Router.put("/update-balance-sheet/:id", verifyToken, updateBalanceSheet);

module.exports = Router;