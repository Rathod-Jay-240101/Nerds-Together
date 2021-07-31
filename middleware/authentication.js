// Load Module
const jwt = require("jsonwebtoken");
const config = require("config");

// Load Module
const User = require("../models/Users");

// Export Module
module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({
            errors: [{ msg: "No Token Found, Access Denied!" }],
        });
    } else {
        try {
            const { id } = jwt.verify(token, config.get("jwtSecret"));
            const user = await User.findById(id);
            if (user) {
                req.id = id;
                next();
            } else {
                return res.status(400).json({
                    errors: [{ msg: "User Does Not Exist" }],
                });
            }
        } catch (error) {
            return res.status(401).json({
                errors: [{ msg: error.message }],
            });
        }
    }
};
