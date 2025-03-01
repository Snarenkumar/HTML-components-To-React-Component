require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const apiKey = process.env.API_KEY;



let ReactComp = [];
let ModuleCss = [];
if (!apiKey) {
  console.error("❌ API_KEY is not defined. Check your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle HTML, CSS, and JS conversion to React Component
app.post("/getReact", async (req, res) => {
  const { html, css, js } = req.body;

  // Validate input
  if (typeof html !== "string" || typeof css !== "string" || typeof js !== "string") {
    return res.status(400).json({ error: "Invalid input! HTML, CSS, and JS must be strings." });
  }

  if (!html.trim() || !css.trim() || !js.trim()) {
    return res.status(400).json({ error: "All fields (HTML, CSS, JS) are required and cannot be empty!" });
  }

  // AI Prompt
  const prompt = `
You are a skilled React developer. Convert the provided HTML, CSS, and JavaScript code into a React component with a separate CSS module.

### **Instructions:**
- Convert HTML into a modern, **functional React component**.
- Convert CSS into a **module.css** file and ensure **CSS Modules** are used.
- Convert JavaScript into **React hooks (useState, useEffect, event handlers, etc.)** if needed.
- Ensure all **event listeners** and **DOM manipulations** in JS are properly handled in React.
- Ensure **className conflicts are avoided** by correctly using styles from the module.css file.
- **DO NOT include any explanations, comments, or extra text**—only return the raw JSX and CSS code.

### **Input:**
#### HTML:
\`\`\`html
${html}
\`\`\`

#### CSS:
\`\`\`css
${css}
\`\`\`

#### JavaScript:
\`\`\`javascript
${js}
\`\`\`

### **Expected Output Format:**
\`\`\`jsx
// Component.jsx
import React, { useState, useEffect } from "react";
import styles from "./Component.module.css";

const Component = () => {
  return (
    <div className={styles.container}>
      {/* JSX content */}
    </div>
  );
};

export default Component;
\`\`\`

\`\`\`css
/* Component.module.css */
.container {
  /* CSS styles */
}
\`\`\`
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    if (!responseText.includes("import React")) {
      throw new Error("Invalid AI response: The generated output does not contain valid React code.");
    }

    console.log("✅ AI Response Generated Successfully:\n", responseText);

    res.json({ success: true, jsx: responseText.split("```jsx")[1]?.split("```")[0]?.trim(), css: responseText.split("```css")[1]?.split("```")[0]?.trim() });
  } catch (error) {
    console.error("❌ Error generating React component:", error.message);
    res.status(500).json({ error: "Failed to generate React component." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
