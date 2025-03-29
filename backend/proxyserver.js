// proxyserver.js

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const GEMINI_API_URL = "https://genai.cloud/api/v1/generate";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ✅ Add a log to verify API key is loaded
console.log("Gemini API Key:", GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received Prompt:", prompt);

  const response = await axios.post(
    GEMINI_API_URL, // Direct URL without query parameter
    {
      model: "gemini-2.0-flash",
      prompt,
      temperature: 0.7,
      max_tokens: 300,
    },
    {
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36", // Realistic user agent
        Accept: "application/json",
      },
      timeout: 10000, // Wait up to 10 seconds
    }
  );



    console.log("Gemini API Response:", response.data);
    res.status(200).json({ generated_text: response.data.generated_text });
  } catch (error) {
    console.error("Proxy Error:", error.message);

    // Log detailed error response
    if (error.response) {
      console.error("Gemini API Error Response:", error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
