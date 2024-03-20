import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {
  const [position, setPosition] = useState(null); // shows user location

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setPosition([position.coords.latitude, position.coords.longitude]);
      } catch (error) {
        console.error('Error getting current position:', error);
        // Default to a fallback position if location retrieval fails
        setPosition([35.779, -78.638]);
      }
    };

    fetchUserLocation();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  return (
    <div>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Your current location. <br /> Latitude: {position[0]}, Longitude: {position[1]}.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Map;
