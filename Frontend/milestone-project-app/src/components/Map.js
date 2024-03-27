import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGZvdW50MSIsImEiOiJjbHU3a2Z3NGgwNzZhMmhwYml1Yng2dDM3In0.hB1Wb6OFmMYNv5gTBXAF-g';

const Map = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(null); // Define map state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Define selected restaurant state

  useEffect(() => {
    // Initialize map only after the DOM is ready
    const initializedMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Default center before obtaining user's location
      zoom: 10
    });

    setMap(initializedMap); // Set map state

    // Clean up function to remove the map on unmount
    return () => {
      initializedMap.remove();
    };
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (!map) return; // Check if map is initialized

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);

        // Search for nearby restaurants using Foursquare API
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'fsq3DnUrdV1vhfKk1UJCE0RxJaF57v3+QbYEXpJH6w4TAas='
          }
        };
        
        fetch(`https://api.foursquare.com/v3/places/search?query=restaurant&ll=${latitude},${longitude}`, options)
          .then(response => response.json())
          .then(response => {
            setRestaurants(response.results);
          })
          .catch(err => console.error(err));
      }
    );
  }, [map]); // Run this effect whenever map changes

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div id="map" style={{ flex: 1, height: '400px', paddingTop: '25px'}} />
        <div style={{ marginLeft: '20px' }}>
          <h2>Restaurants Near You:</h2>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={`${restaurant.name}-${index}`}>
                <button onClick={() => handleRestaurantClick(restaurant)}>{restaurant.name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedRestaurant && (
        <div>
          <h2>{selectedRestaurant.name}</h2>
          <p>Rating: {selectedRestaurant.rating || 'Not Available'}</p>
          <p>Comments: {selectedRestaurant.comments || 'Not Available'}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
