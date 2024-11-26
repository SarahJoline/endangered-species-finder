import "mapbox-gl/dist/mapbox-gl.css";
import "react-tooltip/dist/react-tooltip.css";

import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Tooltip } from "react-tooltip";
import Drawer from "./components/Drawer";

import "./App.css";

function App() {
  const [selectedSpecies, setSelectedSpecies] = useState({});
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [species, setSpecies] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 1,
  });
  function close() {
    setOpen(false);
    setError(false);
    setSelectedSpecies({});
  }

  function calculateBoundingBox(lat, lng, radiusKm) {
    const earthRadiusKm = 6371; // Earth's radius in kilometers

    // Convert degrees to radians
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;

    // Radius in radians
    const angularRadius = radiusKm / earthRadiusKm;

    // Latitude bounds
    const minLat = latRad - angularRadius;
    const maxLat = latRad + angularRadius;

    // Longitude bounds (adjust for latitude)
    const minLng = lngRad - angularRadius / Math.cos(latRad);
    const maxLng = lngRad + angularRadius / Math.cos(latRad);

    // Convert back to degrees and round to 1 decimal point
    return {
      minLat: +((minLat * 180) / Math.PI).toFixed(1),
      maxLat: +((maxLat * 180) / Math.PI).toFixed(1),
      minLng: +((minLng * 180) / Math.PI).toFixed(1),
      maxLng: +((maxLng * 180) / Math.PI).toFixed(1),
    };
  }

  function getRadiusFromZoom(zoom) {
    console.log(zoom);

    if (zoom >= 15) return 100;
    if (zoom >= 12) return 200;
    if (zoom >= 8) return 300;
    if (zoom >= 5) return 400;
    return 800;
  }

  const handleMapClick = async (event) => {
    const { lat, lng } = event.lngLat;

    const radiusKm = getRadiusFromZoom(viewState.zoom); // Adjust radius based on zoom

    console.log(radiusKm);
    const bounds = calculateBoundingBox(lat, lng, radiusKm);

    const apiFormattedLat = `${bounds.minLat},${bounds.maxLat}`;
    const apiFormattedLng = `${bounds.minLng},${bounds.maxLng}`;
    try {
      const response = await fetch(
        `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${apiFormattedLat}&decimalLongitude=${apiFormattedLng}&iucnRedListCategory=EN&iucnRedListCategory=CE&iucnRedListCategory=VU&limit=300`
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
          if (!speciesName) {
            return acc;
          }
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

      console.log(groupedBySpeciesArray);

      setSpecies(groupedBySpeciesArray);
    } catch (error) {
      console.error("Error fetching occurence data:", error);
    }
  };

  async function getSpeciesInfo(sp) {
    try {
      const response = await fetch(`/api/speciesSearch/${sp.species}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        setError(true);
        setOpen(true);
        return;
      }
      const data = await response.json();
      setSelectedSpecies(data);
      setOpen(true);
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
          initialViewState={viewState}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="100%"
          height="100%"
          onMove={(event) => setViewState(event.viewState)}
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
      {open && (
        <Drawer selectedSpecies={selectedSpecies} error={error} close={close} />
      )}
    </>
  );
}

export default App;
