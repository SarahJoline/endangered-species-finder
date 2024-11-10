import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useState } from "react";
import Map, { Marker } from "react-map-gl";

import "./App.css";
import Card from "./components/Card";

function App() {
  const markersRef = useRef([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [renderTrigger, setRenderTrigger] = useState(false);

  const [species, setSpecies] = useState([]);

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
        `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${latitude}&decimalLongitude=${longitude}&iucnRedListCategory=NE&iucnRedListCategory=CE&limit=300`
      );
      const data = await response.json();
      const uniqueSpecies = data.results.reduce((acc, current) => {
        if (!acc.some((item) => item.species === current.species)) {
          acc.push(current);
        }
        return acc;
      }, []);

      const groupedBySpeciesArray = Object.values(
        data.results.reduce((acc, current) => {
          console.log(current);
          const speciesName = current?.species;

          // If the species isn't already a key in the accumulator, add it
          if (!acc[speciesName]) {
            acc[speciesName] = {
              species: speciesName,
              media: current.media || [], // Include the media field
              occurrences: [], // Initialize the occurrences array
            };
          }

          // Push the current occurrence to the species' occurrences array
          acc[speciesName].occurrences.push({
            month: current.month,
            day: current.day,
            year: current.year,
            latitude: current.decimalLatitude,
            longitude: current.decimalLongitude,
          });

          return acc;
        }, {})
      );

      console.log(groupedBySpeciesArray);
      console.log(uniqueSpecies);
      setSpecies(groupedBySpeciesArray);

      // Append new data to the markersRef
      markersRef.current = [...markersRef.current, ...groupedBySpeciesArray];

      // Trigger a re-render
      setRenderTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error fetching occurence data:", error);
    }
  };

  async function getSpeciesInfo(species) {
    console.log(species);
    try {
    } catch (error) {
      console.error("Error fetching species data:", error);
    }
  }

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
          width="80%"
          height="80%"
          onClick={handleMapClick}
        >
          {species.map((sp) =>
            sp.occurrences.map(
              (occurrence, index) =>
                occurrence.latitude &&
                occurrence.longitude && (
                  <Marker
                    key={`${sp.species}-${index}`}
                    latitude={occurrence.latitude}
                    longitude={occurrence.longitude}
                  >
                    <img
                      src="/drop-pin.svg"
                      alt="Drop Pin"
                      height="20"
                      width="20"
                      style={{ cursor: "pointer" }}
                      onClick={() => getSpeciesInfo(sp.species)}
                    />
                  </Marker>
                )
            )
          )}
        </Map>
      </div>
      {/* <form>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((cat) => {
            return <option value={cat}>{cat}</option>;
          })}
        </select>
        {speciesList.length !== 0 && (
          <>
            <label>You have a lot of options! Let's narrow it down:</label>
            <input
              type="text"
              value={speciesSearch}
              onChange={(e) => setSpeciesSearch(e.target.value)}
            />
          </>
        )}
      </form> */}
      {markersRef.current.map((sp) => (
        <Card key={sp.id} sp={sp} setSelectedSpecies={setSelectedSpecies} />
      ))}
    </>
  );
}

export default App;
