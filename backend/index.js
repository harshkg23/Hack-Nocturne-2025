import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed!!!!", err);
  });


  const FLASK_API_URL = "http://127.0.0.1:5000/predict";

  // Endpoint in Node.js that calls the Flask API
  app.post("/analyze-sentiment", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "No text provided" });
      }

      // Send request to Flask
      const response = await axios.post(FLASK_API_URL, { text });

      res.json(response.data); // Forward Flask response
    } catch (error) {
      console.error("Error connecting to Flask:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
