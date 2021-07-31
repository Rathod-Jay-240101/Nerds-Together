// Load Modules
const express = require("express");
const connectToDatabase = require("./config/database");
const fileupload = require("express-fileupload");

// Create instance of express
const app = express();

// Connect to Database
connectToDatabase();

// Set Port
const port = process.env.PORT || 9000;

// Add Middleware
app.use(express.json());
app.use(fileupload());

// Add All Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/authentication", require("./routes/api/authentication"));
app.use("/api/posts", require("./routes/api/posts"));

// Add Main Router
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

// Check For Large Files
const { check } = require("./uploads/compress");
try {
    check();
} catch (error) {
    console.log(error);
}
