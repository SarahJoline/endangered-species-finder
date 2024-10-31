const express = require("express");
require("dotenv").config();
const commonSpecies = require("common-species");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
let speciesData = [];
commonSpecies.loadSpeciesData((dataSet) => {
  speciesData = dataSet;
  console.log(`Species data loaded with ${dataSet.length} entries`);
});

app.get("/api/species/categories", (req, res) => {
  if (speciesData.length === 0) {
    return res.status(503).json({ error: "Species data not loaded yet." });
  }

  // Extract unique category names
  const categoryNames = speciesData.map((species) => species.category_name);
  const uniqueCategoryNames = [...new Set(categoryNames)];

  res.json(uniqueCategoryNames);
});
app.get("/species/:name", (req, res) => {
  if (speciesData.length === 0) {
    return res.status(503).json({ error: "Species data not loaded yet." });
  }
  const commonName = "bear"; // Get name from query
  const filteredSpecies = speciesData.filter((species) =>
    species.common_name.toLowerCase().includes(commonName.toLowerCase())
  );
  res.json(filteredSpecies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
