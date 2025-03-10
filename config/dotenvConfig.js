require("dotenv").config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ API_KEY is not defined. Check your .env file.");
  process.exit(1);
}

const PORT = process.env.PORT || 5001;

module.exports = { apiKey, PORT };
