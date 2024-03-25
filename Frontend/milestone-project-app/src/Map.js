import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGZvdW50MSIsImEiOiJjbHUwZmZ6MGEwMm9qMmtycHNnb2ZhNnVmIn0.3iOk3GBPpQgZBnR0rA1b9A';

const Map = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Default center before obtaining user's location
      zoom: 15
    });

    const addMarkers = (coordinates, popupContent = null) => {
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
        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=VRTP2TAGBNTCOWTEETZQUZN2K5UXXDTNR05EHTNF4OLJS3O1&client_secret=2AUCMGX3KUYFNANS0CKZJYFKCSYREVRINHC5J4GP5K1UJMFZ
        &v=20220315&ll=${latitude},${longitude}&query=restaurant&limit=10`)
          .then(response => response.json())
          .then(data => {
            const restaurantsData = data.response.groups[0].items;
            setRestaurants(restaurantsData);
            restaurantsData.forEach(restaurant => {
              const { lat, lng } = restaurant.venue.location;
              new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${restaurant.venue.name}</h3>`))
                .addTo(map);
            });
          })
          .catch(error => {
            console.error('Error searching for nearby restaurants:', error);
          });

      },
      error => {
        console.error('Error getting user location:', error);
      }
    );

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
