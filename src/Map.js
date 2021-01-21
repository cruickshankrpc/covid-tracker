import React from "react";
// renaming Map as Leaflet Map to avoid confusion with our Map component 
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

// Had to add this as MapContainer's re-centering wouldn't work
function ChangeView({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom);
  return null;
}

// DESTRUCTURING PROPS

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
