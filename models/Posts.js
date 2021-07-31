// Load Modules
const mongoose = require("mongoose");

// Create Schema
const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    text: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("post", schema);
