// Load Modules
const mongoose = require("mongoose");

// Create Schema
const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    website: {
        type: String,
    },
    location: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    education: [
        {
            institute: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            field: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
        github: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Profile = mongoose.model("profile", schema);
