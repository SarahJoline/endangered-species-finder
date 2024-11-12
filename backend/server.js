const express = require("express");
const axios = require("axios");
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
app.get("/api/species/:name", (req, res) => {
  if (speciesData.length === 0) {
    return res.status(503).json({ error: "Species data not loaded yet." });
  }
  const commonName = req.params.name;
  const filteredSpecies = speciesData.filter((species) =>
    species.category_name.toLowerCase().includes(commonName.toLowerCase())
  );
  res.json(filteredSpecies);
});

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

// app.post("/api/speciesSearch", async (req, res) => {
//   console.log(req.body);
//   try {
//     const response = await axios.post(
//       "https://explorer.natureserve.org/api/data/speciesSearch",
//       {
//         criteriaType: "species",
//         speciesTaxonomyCriteria: [
//           {
//             paramType: "scientificTaxonomy",
//             level: "GENUS",
//             scientificTaxonomy: req.body.scientificTaxonomy.split(" ")[0],
//             kingdom: req.body.kingdom,
//           },
//         ],
//       }
//     );
//     console.log(response);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
