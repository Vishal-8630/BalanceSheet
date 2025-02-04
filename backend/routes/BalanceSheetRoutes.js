const express = require("express");
const { addBalanceSheet, getAllBalanceSheet, deleteBalanceSheet, getBalanceSheetById, updateBalanceSheet } = require("./../controllers/BalanceSheetControllers");

const Router = express.Router();

Router.post("/add-balance-sheet", addBalanceSheet);
Router.get("/get-all-balance-sheet", getAllBalanceSheet);
Router.delete("/delete-balance-sheet/:id", deleteBalanceSheet);
Router.get("/get-balance-sheet/:id", getBalanceSheetById);
Router.put("/update-balance-sheet/:id", updateBalanceSheet);

module.exports = Router;