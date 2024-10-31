import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [speciesList, setSpeciesList] = useState([]);
  const [categories, setCatergory] = useState([]);

  const [selectedKingdom, setSelectedKingdom] = useState("");
  const [species, setSpecies] = useState([]);

  const handleSearch = async (e) => {
    // e.preventDefault();
    const response = await fetch(`/species/bear`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    // setSpeciesList(data);
  };

  handleSearch();

  async function fetchCategories() {
    const response = await fetch("api/species/categories");

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
  return (
    <>
      <form>
        <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select
          onChange={(e) => setSelectedKingdom(e.target.value)}
          value={selectedKingdom}
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
