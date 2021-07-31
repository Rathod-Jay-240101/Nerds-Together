// Load Modules
const express = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Load Middleware
const authentication = require("../../middleware/authentication");

// Creating Router
const router = express.Router();

// Load Schema
const Profile = require("../../models/Profiles");

// Handling Get Request For "api/profiles/me"
router.get("/me", authentication, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.id }).populate("user", [
            "fname",
            "lname",
            "avatar",
        ]);

        if (!profile) {
            return res.status(400).json({
                errors: [{ msg: "There is no profile for this user" }],
            });
        } else {
            res.json(profile);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Set Validation For Post "api/profiles"
const validate1 = [
    check("location", "Location Is Must Required").notEmpty(),
    check("status", "Status Is Must Required").notEmpty(),
    check("skills", "Skills Are Must Required").notEmpty(),
    check("bio", "Short Bio Is Must Required").notEmpty(),
];

// Handling Post Request For "api/profiles"
router.post("/", authentication, validate1, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        const {
            website,
            location,
            status,
            skills,
            bio,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
            github,
        } = req.body;

        const profileFields = {};

        profileFields.user = req.id;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (status) profileFields.status = status;
        if (bio) profileFields.bio = bio;
        if (skills) {
            profileFields.skills = skills.split(",").map((skill) => skill.trim());
        }
        profileFields.social = {};

        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (facebook) profileFields.social.facebook = facebook;
        if (github) profileFields.social.github = github;

        try {
            let profile = await Profile.findOne({ user: req.id });

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.id },
                    { $set: profileFields },
                    { new: true }
                ).populate("user", ["fname", "lname", "avatar"]);
            } else {
                profile = new Profile(profileFields);
                await profile.save();
                profile = await Profile.findOne({ user: req.id }).populate("user", [
                    "fname",
                    "lname",
                    "avatar",
                ]);
            }

            return res.json(profile);
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Get Request For "api/profiles"
router.get("/", authentication, async (req, res) => {
    try {
        let profiles = await Profile.find().populate("user", ["fname", "lname", "avatar"]);
        profiles = profiles.filter((profile) => profile.user._id != req.id);
        res.json(profiles);
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

// Handling Get Request For "api/profiles/user/:user_id"
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate("user", ["fname", "lname", "avatar"]);

        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile Not Found" }] });
        } else {
            return res.json(profile);
        }
    } catch (error) {
        if (error.kind == "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Profile Not Found" }] });
        } else {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

const validate2 = [
    check("title", "Title Of Experience Is Must Required").notEmpty(),
    check("company", "Company Name Is Must Required").notEmpty(),
    check("location", "Location Of Company Is Must Required"),
    check("from", "Starting Date Of Work Is Must Required").notEmpty(),
    check("description", "Description Of Your Work Is Must Required").notEmpty(),
];

// Handling Put Request For "api/profiles/experience"
router.put("/experience", authentication, validate2, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        try {
            const profile = await Profile.findOne({ user: req.id }).populate("user", [
                "fname",
                "lname",
                "avatar",
            ]);
            profile.experience.unshift(req.body);
            await profile.save();
            return res.json(profile);
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Delete Request For "api/profiles/experience/:exp_id"
router.delete("/experience/:exp_id", authentication, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.id });

        profile.experience = profile.experience.filter(
            (exp) => exp._id.toString() !== req.params.exp_id
        );

        await profile.save();
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

const validate3 = [
    check("institute", "Institute Name Is Must Required").notEmpty(),
    check("degree", "Degree Name Is Must Required").notEmpty(),
    check("field", "Field Name Is Must Required").notEmpty(),
    check("from", "Starting Date Of Work Is Must Required").notEmpty(),
    check("description", "Description Of Your Work Is Must Required").notEmpty(),
];

// Handling Put Request For "api/profiles/education"
router.put("/education", authentication, validate3, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        try {
            const profile = await Profile.findOne({ user: req.id }).populate("user", [
                "fname",
                "lname",
                "avatar",
            ]);
            profile.education.unshift(req.body);
            await profile.save();
            return res.json(profile);
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Delete Request For "api/profiles/education/:edu_id"
router.delete("/education/:edu_id", authentication, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.id });

        profile.education = profile.education.filter(
            (exp) => exp._id.toString() !== req.params.edu_id
        );

        await profile.save();
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

module.exports = router;
