const User = require("../models/UserModel");

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please fill all the details" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = user.generateToken();
        res.status(200).json({
            message: "Login successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                username: user.username,
                phoneNumber: user.phoneNumber,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            },
            token
        });
    } catch (error) {
        return res.status(400).json({ message: "Error while login", error: error.message });
    }
};

const registerUser = async (req, res) => {
    const { fullname, username, phoneNumber, password, confirmPassword } = req.body;
    if (!fullname || !username || !phoneNumber || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please fill all the details" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password mismatch " });
    }

    try {
        const existingUserByUsername = await User.findOne({ username });
        const existingUserByPhoneNumber = await User.findOne({ phoneNumber });


        if (existingUserByUsername) {
            console.log("user", existingUserByUsername);
            return res.status(400).json({ message: "User already exists with entered username" });
        }

        if (existingUserByPhoneNumber) {
            return res.status(400).json({ message: "User already exists with entered phone number" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // 6 - digits
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

        console.log("OTP:", otp);

        const newUser = new User({ fullname, username, phoneNumber, password, otp, otpExpires });
        await newUser.save();

        res.status(201).json({ message: "OTP sent. Please verify your phone number." });
    } catch (error) {
        res.status(400).json({ message: "Error registering the user", error: error.message });
    }
};

const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (!otp || !phoneNumber) {
        return res.statu(400).json({ message: "Please enter the otp" });
    }

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.statu(400).json({ message: "User not found" });
        }

        if (user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const token = user.generateToken();
        return res.status(200).json({
            message: "Phone number verified successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                username: user.username,
                phoneNumber: user.phoneNumber,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            },
            token
        });
    } catch (error) {
        return res.status(400).json({ message: "Error Verifying OTP", error: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, username, phoneNumber } = req.body;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.phoneNumber !== phoneNumber) {
            user.isVerified = false;
        }

        user.fullname = fullname;
        user.username = username;
        user.phoneNumber = phoneNumber;
        await user.save();

        return res.status(200).json({
            message: "User updated successfully", 
            user: {
                id: user._id,
                fullname: user.fullname,
                username: user.username,
                phoneNumber: user.phoneNumber,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Error while updating user", error: error.message });
    }
}

const logoutUser = async (req, res) => {

};

module.exports = {
    loginUser,
    registerUser,
    verifyOtp,
    updateUser,
    logoutUser
}