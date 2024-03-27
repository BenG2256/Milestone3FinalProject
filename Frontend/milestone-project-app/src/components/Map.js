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

  // Function to handle showing popup for a restaurant
  const showPopupForRestaurant = (restaurant) => {
    console.log("Restaurant:", restaurant);
    if (restaurant && restaurant.location && restaurant.location.lat && restaurant.location.lng) {
      const popupContent = `
      <h3>${restaurant.name}</h3>
      <p>Rating: ${restaurant.rating || 'Not Available'}</p>
      <p>Comments: ${restaurant.comments || 'Not Available'}</p>
    `;
      const coordinates = [restaurant.location.lng, restaurant.location.lat];
      const newPopup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(popupContent).addTo(map);
      setPopup(newPopup);
    } else {
      console.error("Invalid restaurant location");
    }
  };




  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px', paddingTop: '25px' }} />
      <div>
        <h2>Restaurants Near You:</h2>
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={`${restaurant.name}-${index}`}>
              <button onClick={() => showPopupForRestaurant(restaurant)}>{restaurant.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
