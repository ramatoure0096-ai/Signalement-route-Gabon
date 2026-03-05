import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setPosition }) {

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      alert("Position sélectionnée 📍");
    },
  });

  return null;
}

function MapComponent({ setPosition }) {
  return (
    <MapContainer
      center={[0.4162, 9.4673]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker setPosition={setPosition} />
    </MapContainer>
  );
}

export default MapComponent;