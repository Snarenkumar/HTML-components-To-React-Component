require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store messages temporarily
let messages = [];

// Route to handle form submissions
app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const newMessage = { name, email, message };
    messages.push(newMessage);

    console.log("New Message Received:", newMessage);
    res.json({ success: true, message: "Message received!" });
});
app.post("/getReact", (req, res) => {
    const data= req.body;
    console.log(data.html);
    if (!data) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const newMessage = data;
    console.log(data.css);
    console.log(data.js);
    messages.push(newMessage);

    
    res.json({ success: true, message: "Message received!" });
});

// Route to display messages (for testing)
app.get("/messages", (req, res) => {
    res.json(messages);
});

app.get("/messages", (req, res) => {
    res.json(messages);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));