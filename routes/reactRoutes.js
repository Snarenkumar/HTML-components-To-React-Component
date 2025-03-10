const express = require("express");
const { generateReactComponent } = require("../services/genAIService");

const router = express.Router();

router.post("/getReact", async (req, res) => {
  const { html, css, js } = req.body;

  if (typeof html !== "string" || typeof css !== "string" || typeof js !== "string") {
    return res.status(400).json({ error: "Invalid input! HTML, CSS, and JS must be strings." });
  }

  try {
    const result = await generateReactComponent(html, css, js);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
