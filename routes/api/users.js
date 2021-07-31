// Load Modules
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { deleteFile } = require("../../uploads/compress");

// Create Router
const router = express.Router();

// Load Schema
const User = require("../../models/Users");
const Profile = require("../../models/Profiles");
const Post = require("../../models/Posts");

// Load Middleware
const authentication = require("../../middleware/authentication");

// Set Validations
const validate = [
    check("fname", "First Name Is Must Required").notEmpty(),
    check("fname", "First Name Length Must Be Greater Than Or Equal To 3").isLength({
        min: 3,
    }),
    check("lname", "Last Name Is Must Required").notEmpty(),
    check("lname", "Last Name Length Must Be Greater Than Or Equal To 3").isLength({
        min: 3,
    }),
    check("password", "Password Is Must Required").notEmpty(),
    check("password", "Password Must Be Greater Than Or Equal To 8").isLength({
        min: 8,
    }),
    check("email", "Email Is Must Required").notEmpty(),
    check("email", "Email Is Not In Valid Format").isEmail(),
];

// Handling Post Request For "api/users"
router.post("/", validate, async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        let { fname, lname, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ msg: "User Is Already Registered" }],
                });
            } else {
                const avatar = `https://ui-avatars.com/api/?background=random&rounded=true&size=200&name=${fname}+${lname}`;

                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);

                user = new User({
                    fname,
                    lname,
                    email,
                    password,
                    avatar,
                });

                await user.save();

                const payload = {
                    id: user.id,
                };

                const jwtSecret = config.get("jwtSecret");

                jwt.sign(
                    payload,
                    jwtSecret,
                    {
                        expiresIn: 3600,
                    },
                    (error, token) => {
                        if (error) {
                            throw error;
                        } else {
                            return res.json({ token });
                        }
                    }
                );
            }
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Delete Request For "api/users"
router.delete("/", authentication, async (req, res) => {
    try {
        const user = await User.findById(req.id);
        if (user) {
            await User.findByIdAndRemove(req.id);
            await Profile.findOneAndRemove({ user: req.id });
            const posts = await Post.find({ user: req.id });
            posts.forEach((post) => {
                post.remove();
            });
            deleteFile(req.id);
            return res.json({ msg: "User Is Deleted Successfully" });
        } else {
            return res.status(400).json({
                errors: [{ msg: "User Does Not Exist" }],
            });
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

// Export Module
module.exports = router;
