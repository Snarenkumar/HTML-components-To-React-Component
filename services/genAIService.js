const { GoogleGenerativeAI } = require("@google/generative-ai");
const { apiKey } = require("../config/dotenvConfig");

const genAI = new GoogleGenerativeAI(apiKey);

const generateReactComponent = async (html, css, js) => {
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

    console.log("✅ AI Response Generated Successfully");
    return {
      jsx: responseText.split("```jsx")[1]?.split("```")[0]?.trim(),
      css: responseText.split("```css")[1]?.split("```")[0]?.trim(),
    };
  } catch (error) {
    console.error("❌ Error generating React component:", error.message);
    throw new Error("Failed to generate React component.");
  }
};

module.exports = { generateReactComponent };
