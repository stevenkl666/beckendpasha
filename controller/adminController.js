import Admin from "../models/adminModel.js";

export const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newAdmin = await Admin.create({
            username,
            email,
            password
        });

        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error registering admin", error: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (password !== admin.password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.adminId, { attributes: { exclude: ['password'] } });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin profile", error: error.message });
    }
};

export const updateAdminProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const admin = await Admin.findByPk(req.adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const updatedAdmin = await admin.update({ username, email });
        res.status(200).json({ message: "Admin profile updated successfully", admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error updating admin profile", error: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Admin.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Admin deleted successfully" });
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting admin", error: error.message });
    }
}; 
   