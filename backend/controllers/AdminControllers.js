const Admin = require('../models/AdminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllAdmins = async (req, res) => {
    try {
        const allAdmin = await Admin.find().select('-password');
        res.status(200).json(allAdmin);
    } catch (error) {
        res.status(500).json({ message: "Error getting all admins", error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const signupAdmin = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    console.log(req.body);

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please fill all the details" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if(!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found "});
        }
        return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the admin" , error: error.message });
    }
}

module.exports = {
    getAllAdmins,
    loginAdmin,
    signupAdmin,
    deleteAdmin
};
