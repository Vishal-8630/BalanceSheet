const BalanceSheet = require("../models/BalanceSheetModel"); // Import your Mongoose model

const addBalanceSheet = async (req, res) => {
    try {
        const newBalanceSheet = new BalanceSheet(req.body); // Create a new document
        console.log(newBalanceSheet);
        await newBalanceSheet.save(); // Save it to the database

        res.status(201).json({ message: "Balance Sheet added successfully!", data: newBalanceSheet });
    } catch (error) {
        res.status(500).json({ message: "Error adding Balance Sheet", error: error.message });
    }
};

const getAllBalanceSheet = async (req, res) => {
    try {
        const allBalanceSheet = await BalanceSheet.find(); // Fetch all balance sheets
        res.status(200).json(allBalanceSheet);
    } catch (error) {
        res.status(500).json({ message: "Error getting all sheets", error: error.message });
    }
}

const deleteBalanceSheet = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the balance sheet by ID
        const deletedSheet = await BalanceSheet.findByIdAndDelete(id);

        if (!deletedSheet) {
            return res.status(404).json({ message: "Balance Sheet not found" });
        }

        res.status(200).json({ message: "Balance Sheet deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting balance sheet", error: error.message });
    }
};

const getBalanceSheetById = async (req, res) => {
    try {
        const { id } = req.params;
        const balanceSheet = await BalanceSheet.findById(id); // Assuming Mongoose is used

        if (!balanceSheet) {
            return res.status(404).json({ message: "Balance Sheet not found" });
        }

        res.status(200).json(balanceSheet);
    } catch (error) {
        console.error("Error fetching balance sheet:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateBalanceSheet = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedBalanceSheet = await BalanceSheet.findByIdAndUpdate(
            id, 
            updatedData, 
            { new: true, runValidators: true } // Return updated doc & validate
        );

        if (!updatedBalanceSheet) {
            return res.status(404).json({ message: "Balance Sheet not found" });
        }

        res.status(200).json({ message: "Balance Sheet updated", data: updatedBalanceSheet });
    } catch (error) {
        console.error("Error updating balance sheet:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addBalanceSheet,
    getAllBalanceSheet,
    deleteBalanceSheet,
    getBalanceSheetById,
    updateBalanceSheet
}