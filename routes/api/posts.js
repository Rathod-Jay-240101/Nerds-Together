const express = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Load Middleware
const authentication = require("../../middleware/authentication");

// Creating Router
const router = express.Router();

// Load Schema
const Posts = require("../../models/Posts");
const Users = require("../../models/Users");

// Set Validation For Post "api/posts"
const validate = [check("text", "Text Is Must Required").notEmpty()];

// Handling Get Request For "api/posts"
router.post("/", authentication, validate, async (req, res) => {
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
            const postFields = new Posts({
                text: req.body.text,
                user: req.id,
            });

            let post = await postFields.save();
            post = await Posts.findById(post._id).populate("user", ["fname", "lname", "avatar"]);

            res.json(post);
        } catch (error) {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Get Request For "api/posts"
router.get("/", authentication, async (req, res) => {
    try {
        let posts = await Posts.find()
            .sort({ date: -1 })
            .populate("user", ["fname", "lname", "avatar"])
            .populate("comments.user", ["fname", "lname", "avatar"]);
        posts = posts.filter((post) => post.user._id.toString() !== req.id);
        res.json(posts);
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

// Handling Get Request For "api/posts/me"
router.get("/me", authentication, async (req, res) => {
    try {
        const posts = await Posts.find({ user: req.id })
            .sort({ date: -1 })
            .populate("user", ["fname", "lname", "avatar"])
            .populate("comments.user", ["fname", "lname", "avatar"]);
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({
            errors: [{ msg: error.message }],
        });
    }
});

// Handling Get Request For "api/posts/post/:post_id"
router.get("/post/:post_id", authentication, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            return res.json(post);
        }
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Delete Request For "api/posts/post/:post_id"
router.delete("/post/:post_id", authentication, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            if (post.user.toString() !== req.id) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: "User Not Authorized To Delete Post" }] });
            } else {
                await post.remove();
                return res.json({ msg: "Post Removed Successfully" });
            }
        }
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Put Request For "api/posts/likes/:post_id"
router.put("/likes/:post_id", authentication, async (req, res) => {
    try {
        let post = await Posts.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            if (post.likes.some((like) => like.user.toString() === req.id)) {
                post.likes = post.likes.filter((like) => like.user.toString() !== req.id);
                await post.save();
                return res.json(post.likes);
            } else {
                post.likes.unshift({ user: req.id });
                await post.save();
                return res.json(post.likes);
            }
        }
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

// Handling Put Request For "api/posts/comments/:post_id"
router.put("/comments/:post_id", authentication, validate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array().map((error) => ({
            msg: error.msg,
        }));
        return res.status(400).json({
            errors,
        });
    } else {
        try {
            let post = await Posts.findById(req.params.post_id);
            if (!post) {
                return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
            } else {
                const commentFields = {
                    user: req.id,
                    text: req.body.text,
                };
                post.comments.unshift(commentFields);
                await post.save();
                post = await Posts.findById(req.params.post_id).populate("comments.user", [
                    "fname",
                    "lname",
                    "avatar",
                ]);
                return res.json(post.comments);
            }
        } catch (err) {
            if (error.kind === "ObjectId") {
                return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
            } else {
                return res.status(500).json({
                    errors: [{ msg: error.message }],
                });
            }
        }
    }
});

// Handling Delete Request For "api/posts/comments/:post_id/:comment_id"
router.delete("/comments/:post_id/:comment_id", authentication, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.post_id).populate("comments.user", [
            "fname",
            "lname",
            "avatar",
        ]);
        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            const index = post.comments.findIndex(
                (comment) => comment._id.toString() === req.params.comment_id
            );
            if (index !== null) {
                if (post.comments[index].user._id.toString() === req.id) {
                    post.comments.splice(index, 1);
                    await post.save();
                    return res.json(post.comments);
                } else {
                    return res
                        .status(401)
                        .json({ errors: [{ msg: "User Is Not Authorized To Delete Comment" }] });
                }
            } else {
                return res.status(404).json({ errors: [{ msg: "Comment Not Found" }] });
            }
        }
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });
        } else {
            return res.status(500).json({
                errors: [{ msg: error.message }],
            });
        }
    }
});

module.exports = router;
