import React, { useState } from "react";
import Map from "react-map-gl";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [species, setSpecies] = useState("");

  return (
    <>
      <form onSubmit={handleSearch}>
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
