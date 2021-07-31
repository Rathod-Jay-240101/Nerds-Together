// Load Modules
const mongoose = require("mongoose");
const config = require("config");

// Load Constant Data
const mongoURL = config.get("mongoURL");

// Function Which Connects To MongoDB
const connectToDatabase = async function () {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// Export Modules
module.exports = connectToDatabase;
