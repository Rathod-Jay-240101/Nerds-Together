// Load Modules
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
const fs = require("fs");

// Create Router
const router = express.Router();

// Load Schema
const User = require("../../models/Users");

// Load Authentication Middleware
const authentication = require("../../middleware/authentication");

// Handling Get Request "api/authentication"
router.get("/", authentication, async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

// Set Validations for "api/authentication" Post request
const validate1 = [
    check("password", "Password Is Must Required").notEmpty(),
    check("password", "Password Must Be Greater Than Or Equal To 8").isLength({
        min: 8,
    }),
    check("email", "Email Is Must Required").notEmpty(),
    check("email", "Email Is Not In Valid Format").isEmail(),
];

// Handling Post Request "api/authentication"
router.post("/", validate1, async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        let { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: "User Is Not Registered" }],
                });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{ msg: "Invalid Credentials" }],
                    });
                } else {
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
            }
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Set Validations for "api/authentication/forgot-password" Post request
const validate2 = [
    check("email", "Email Is Must Required").notEmpty(),
    check("email", "Email Is Not In Valid Format").isEmail(),
];

// Handling Post Request "api/authentication/forgot-password"
router.post("/forgot-password/", validate2, async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        let { email } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: "User Is Not Registered" }],
                });
            } else {
                const payload = {
                    id: user.id,
                };

                const jwtSecret = config.get("jwtSecret");

                jwt.sign(
                    payload,
                    jwtSecret,
                    {
                        expiresIn: 600,
                    },
                    (error, token) => {
                        if (error) {
                            throw error;
                        } else {
                            const gmailPassword = config.get("gmailPassword");

                            const transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: "nerds.together.service@gmail.com",
                                    pass: gmailPassword,
                                },
                            });

                            const mailOptions = {
                                from: "nerds.together.service@gmail.com",
                                to: email,
                                subject: "Link For Resetting The Password.",
                                html: `<h2>This Link Only Work For 10 Minutes</h2>
                                        <br />
                                        http://localhost:3000/reset-password/${token}`,
                            };

                            transporter.sendMail(mailOptions, function (error) {
                                if (error) {
                                    throw error;
                                } else {
                                    return res.json({
                                        msg: "Password Reset Link Is Send To Your Email",
                                    });
                                }
                            });
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

const validate3 = [
    check("password", "Password Is Must Required").notEmpty(),
    check("password", "Password Must Be Greater Than Or Equal To 8").isLength({
        min: 8,
    }),
];

// Handling Post Request For "api/authentication/reset-password"
router.post("/reset-password/", authentication, validate3, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const credentials = {
            password,
        };
        try {
            await User.findByIdAndUpdate(req.id, { $set: credentials });
            return res.json({ msg: "Your Password Updated Successfully" });
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Post Request For "api/authentication/avatars
router.post("/avatars/", authentication, async (req, res) => {
    if (req.files.file) {
        const file = req.files.file;
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
            const path = `${__dirname}\\..\\..\\uploads\\${req.id}.jpg`;
            try {
                file.mv(path, (error) => {
                    if (error) {
                        throw error;
                    }
                });
                const avatar = `http://localhost:9000/api/authentication/avatar/${req.id}`;
                const updatedAvatar = {
                    avatar,
                };
                const user = await User.findByIdAndUpdate(
                    req.id,
                    { $set: updatedAvatar },
                    { new: true }
                );
                res.json(user);
            } catch (error) {
                return res.status(500).json({
                    errors: [{ msg: error.message }],
                });
            }
        } else {
            return res.status(400).json({
                errors: [{ msg: "Only Jpg / Jpeg Files Are Accepted" }],
            });
        }
    } else {
        return res.status(400).json({
            errors: [{ msg: "Image File Is Must Required" }],
        });
    }
});

// Handling Get Request For "api/authentication/avatar/:avatar_id
router.get("/avatar/:avatar_id", async (req, res) => {
    try {
        fs.readFile(`${__dirname}\\..\\..\\uploads\\${req.params.avatar_id}.jpg`, (error, data) => {
            if (error) {
                throw error;
            } else {
                res.setHeader("Content-Type", "image/jpeg");
                res.write(data);
                res.end();
            }
        });
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

// Export Module
module.exports = router;
