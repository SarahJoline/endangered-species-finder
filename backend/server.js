const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

app.get("/api/speciesSearch/:scientificTaxonomy", async (req, res) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${req.params.scientificTaxonomy}`
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
