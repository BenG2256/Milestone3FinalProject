import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGZvdW50MSIsImEiOiJjbHU3aWxicXgwNncyMmpuMGx6ZXJqMjd1In0.Y3FGLQWa25Z5ZBY0y0GsCQ';

const Map = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Initialize map only after the DOM is ready
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Default center before obtaining user's location
      zoom: 15
    });

    const addMarkers = (coordinates, popupContent = null) => {
      if (!map || !map.loaded()) return; // Check if map is initialized and loaded
      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(popupContent)
        .addTo(map);
    };

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);

        // Add a marker for the user's current location
        addMarkers([longitude, latitude], new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'));

        // Search for nearby restaurants using Foursquare API
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'fsq3vJtJHD6pkvCyJi4+k3uNuYmss7LvvI/SKhW6jxqHHIs='
          }
        };
        
        fetch('https://api.foursquare.com/v3/places/search?query=restaurant', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
  });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      <div>
        <h2>Restaurants Near You:</h2>
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.venue.id}>{restaurant.venue.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
