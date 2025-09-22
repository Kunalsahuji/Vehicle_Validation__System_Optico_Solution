const User = require("../models/user");
const generateToken = require("../utils/generateToken");

// Bootstrap route - create first Super Admin if none exists
exports.bootstrapSuperAdmin = async (req, res) => {
    try {
        const exists = await User.findOne({ role: "superadmin" });
        if (exists) {
            return res.status(400).json({ message: "Super Admin already exists" });
        }

        const { name, mobile, email, password } = req.body;
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const superAdmin = await User.create({
            name,
            mobile,
            email,
            password,
            role: "superadmin",
        });

        res.status(201).json({
            message: "Super Admin created successfully",
            superAdmin: {
                _id: superAdmin._id,
                name: superAdmin.name,
                email: superAdmin.email,
                mobile: superAdmin.mobile,
                role: superAdmin.role,
                token: generateToken(superAdmin._id, superAdmin.role),
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    } 
};
