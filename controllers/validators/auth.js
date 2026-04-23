function validateSignup(req, res, next) {
    const { hospital_id, name, address, admin_name, admin_email, password } = req.body;
    if (!hospital_id || !name || !address || !admin_name || !admin_email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (hospital_id.length < 3) {
        return res.status(400).json({ message: "Hospital ID must be at least 3 characters long" });
    }
    if (hospital_id.length > 20) {
        return res.status(400).json({ message: "Hospital ID must be less than 20 characters long" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (password.length > 100) {
        return res.status(400).json({ message: "Password must be less than 100 characters long" });
    }
    if (!admin_email.includes("@")) {
        return res.status(400).json({ message: "Invalid email address" });
    }
    if (admin_email.length > 100) {
        return res.status(400).json({ message: "Email must be less than 100 characters long" });
    }
    if (name.length < 2) {
        return res.status(400).json({ message: "Name must be at least 2 characters long" });
    }
    if (name.length > 50) {
        return res.status(400).json({ message: "Name must be less than 50 characters long" });
    }
    if (admin_name.length < 2) {
        return res.status(400).json({ message: "Admin name must be at least 2 characters long" });
    }
    if (admin_name.length > 50) {
        return res.status(400).json({ message: "Admin name must be less than 50 characters long" });
    }
    next();
};

module.exports = {
    validateSignup,
};