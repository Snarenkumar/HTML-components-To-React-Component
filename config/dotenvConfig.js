require("dotenv").config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ API_KEY is not defined. Check your .env file.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

module.exports = { apiKey, PORT };
