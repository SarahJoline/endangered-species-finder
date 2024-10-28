import axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import "./App.css";

function App() {
  const [trackingData, setTrackingData] = useState(null);
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [species, setSpecies] = useState("");
  const handleSearch = async () => {};
  useEffect(() => {
    // Fetch data from your backend API
    const fetchSpeciesTypeData = async () => {
      try {
        const response = await axios.get(
          `https://api.gbif.org/v1/species/search?habitat=FRESHWATER`
        );
        // const response = await axios.get(`/api`);
        setSpeciesList(response.data.results);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tracking data");
        setLoading(false);
      }
    };

    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(
          `https://api.gbif.org/v1/occurrence/search?scientificName=Glomeromycota`
        );
        // const response = await axios.get(`/api`);
        setTrackingData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tracking data");
        setLoading(false);
      }
    };
    fetchSpeciesTypeData();
    fetchTrackingData();
  }, []);

  console.log(speciesList);
  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
        <button type="submit">Search</button>
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
        />
      </div>
    </>
  );
}

export default App;
