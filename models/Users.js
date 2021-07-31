// Load Modules
const mongoose = require("mongoose");

// Create Schema
const schema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Export Module
module.exports = User = mongoose.model("user", schema);
