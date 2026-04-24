function validatePatient(req, res, next) {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Invalid patient name" });
    }
    if (name.trim().length < 2 || name.length > 100) {
        return res.status(400).json({ message: "Patient name must be between 2 and 100 characters" });
    }
    next();
};

module.exports = {
    validatePatient,
};