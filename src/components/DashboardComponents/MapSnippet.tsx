import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Spinner } from "react-bootstrap";
import garageIcon from "../../assets/garage.svg";

// Icon for the marker (optional)
const markerIcon = new L.Icon({
  iconUrl: garageIcon,
  iconSize: [38, 38],
});

interface Props {
  address: string;
}

function MapPopup({ address }: Props) {
  // Default to Paris coordinates using LatLng object
  const [coordinates, setCoordinates] = useState(new L.LatLng(48.8566, 2.3522));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Fetch coordinates from Nominatim API based on the address
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();

        // If data is found, set the coordinates using LatLng object
        if (data.length > 0) {
          setCoordinates(
            new L.LatLng(parseFloat(data[0].lat), parseFloat(data[0].lon))
          );
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <>
      {loading ? (
        <div>
          <h1 className="center">Chargement de la carte ...</h1>
          <Spinner />
        </div>
      ) : (
        <MapContainer
          center={coordinates}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates} icon={markerIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

export default MapPopup;
