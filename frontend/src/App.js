import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [speciesList, setSpeciesList] = useState([]);
  const [categories, setCatergory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [species, setSpecies] = useState([]);

  const handleSearch = async (e) => {
    // e.preventDefault();
    const response = await fetch(`/species/bear`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    // setSpeciesList(data);
  };
  console.log(categories);
  handleSearch();

  async function fetchCategories() {
    const response = await fetch("api/species/categories");

    const data = await response.json();

    setCatergory(data);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categories);

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
  return (
    <>
      <form>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((cat) => {
            return <option value={cat}>{cat}</option>;
          })}
        </select>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="Animal">Animal</option>
          <option value="2">Funghi</option>
          <option value="3">Plant</option>
        </select>
      </form>

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
      {species.map((sp) => (
        <Card sp={sp} />
      ))}
    </>
  );
}

export default App;
