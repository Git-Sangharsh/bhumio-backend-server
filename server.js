import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

// Useing CORS to allow requests
app.use(cors({
  origin: 'http://localhost:3000', // Connecting To the Frontend
}));

app.get('/api/rate-checker', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.consumerfinance.gov/oah-api/rates/rate-checker',
      {
        params: req.query,  // Forwarding the query parameters from the client
      }
    );
    res.json(response.data);  // Sending back the data received from the external API
  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });  // Send a better error response
  }
});

app.get("/", (req, res) => {
  res.send("<h1>HEllo world</h1>")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
