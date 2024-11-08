import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [speciesList, setSpeciesList] = useState([]);
  const [categories, setCatergory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [speciesSearch, setSpeciesSearch] = useState("");
  const [filteredSpecies, setFilteredSpecies] = useState([]);

  const [species, setSpecies] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/species/${selectedCategory}`);
    const data = await response.json();
    setSpeciesList(data);
  };

  async function fetchCategories() {
    const response = await fetch("/api/species/categories");

    const data = await response.json();

    setCatergory(data);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleMapClick = async (event) => {
    const { lat, lng } = event.lngLat;
    const latitude =
      lat.toFixed(1) < Math.round(lat)
        ? `${lat.toFixed(1)},${Math.round(lat)}`
        : `${Math.round(lat)},${lat.toFixed(1)}`;
    const longitude =
      lng.toFixed(1) < Math.round(lng)
        ? `${lng.toFixed(1)},${Math.round(lng)}`
        : `${Math.round(lng)},${lng.toFixed(1)}`;

    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${latitude}&decimalLongitude=${longitude}`
      );
      const data = await response.json();

      console.log(data.results);
      setSpecies(data.results);
    } catch (error) {
      console.error("Error fetching species data:", error);
    }
  };

  const searchSpeciesByCommonName = () => {
    return speciesList.filter(({ common_name }) =>
      common_name.includes(speciesSearch)
    );
  };

  console.log(searchSpeciesByCommonName);

  useEffect(() => {
    const result = searchSpeciesByCommonName();

    setFilteredSpecies(result);
  }, [speciesSearch]);

  console.log(speciesList);

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);
  return (
    <>
      <div style={{ width: "80vw", height: "80vh" }}>
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 1,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="100%"
          height="100%"
          onClick={handleMapClick}
        />
      </div>
      <form>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((cat) => {
            return <option value={cat}>{cat}</option>;
          })}
        </select>
        You have a lot of options! Let's narrow it down:
        <input
          type="text"
          value={speciesSearch}
          onChange={(e) => setSpeciesSearch(e.target.value)}
        />
      </form>

      {filteredSpecies.length !== 0
        ? filteredSpecies.map((sp) => <Card key={sp.id} sp={sp} />) // Render filtered species
        : speciesList.map((sp) => <Card key={sp.id} sp={sp} />)}
    </>
  );
}

export default App;
