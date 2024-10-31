const express = require("express");
const cors = require("cors");
require("dotenv").config();
const allSpecies = require("common-species");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.get("/species/:name", (req, res) => {
  //   const name = req.params.name.toLowerCase();
  //   const species = allSpecies.filter((item) =>
  //     item.commonName.toLowerCase().includes(name)
  //   );
  res.json(allSpecies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
