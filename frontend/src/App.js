import "mapbox-gl/dist/mapbox-gl.css";
import "react-tooltip/dist/react-tooltip.css";

import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Tooltip } from "react-tooltip";
import Drawer from "./components/Drawer";

import "./App.css";

function App() {
  const [selectedSpecies, setSelectedSpecies] = useState({});

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
          const speciesName = current?.species;

          // If the species isn't already a key in the accumulator, add it
          if (!acc[speciesName]) {
            acc[speciesName] = {
              species: speciesName,
              kingdom: current.kingdom,
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

      setSpecies(groupedBySpeciesArray);
    } catch (error) {
      console.error("Error fetching occurence data:", error);
    }
  };

  async function getSpeciesInfo(sp) {
    console.log(sp);
    try {
      const response = await fetch(`/api/speciesSearch/${sp.species}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSelectedSpecies(data);
    } catch (error) {
      console.error("Error fetching species data:", error);
    }
  }

  console.log(selectedSpecies);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
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
        >
          {species.map((sp) => {
            return sp.occurrences.map(
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
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={sp.species}
                      style={{ cursor: "pointer" }}
                      onClick={() => getSpeciesInfo(sp)}
                    />
                    <Tooltip id="my-tooltip" />
                  </Marker>
                )
            );
          })}
        </Map>
      </div>
      <Drawer selectedSpecies={selectedSpecies} />
    </>
  );
}

export default App;
