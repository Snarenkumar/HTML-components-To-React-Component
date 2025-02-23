// backend/index.js
const express = require("express");

const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());



// Dummy user data


// Login route
app.post("/login", (req, res) => {
  
  res.json({ token });
});
app.post("/login", (req, res) => {
  
  res.json({ token });
});


app.listen(5000, () => console.log("Server running on port 5000"));
