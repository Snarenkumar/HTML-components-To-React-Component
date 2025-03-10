const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/dotenvConfig");
const reactRoutes = require("./routes/reactRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Correct Route Registration
app.use("/api/react", reactRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
