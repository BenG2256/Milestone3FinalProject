import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGZvdW50MSIsImEiOiJjbHUwZmZ6MGEwMm9qMmtycHNnb2ZhNnVmIn0.3iOk3GBPpQgZBnR0rA1b9A';

const Map = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Default center before obtaining user's location
      zoom: 9
    });

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);


        // Add a marker for the user's current location
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

        // Search for nearby restaurants using Foursquare API
        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=VRTP2TAGBNTCOWTEETZQUZN2K5UXXDTNR05EHTNF4OLJS3O1&client_secret=2AUCMGX3KUYFNANS0CKZJYFKCSYREVRINHC5J4GP5K1UJMFZ

        &v=20220315&ll=${latitude},${longitude}&query=restaurant&limit=10`)
          .then(response => response.json())
          .then(data => {
            const restaurants = data.response.groups[0].items;
            restaurants.forEach(restaurant => {
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


        // Fetch nearby places using obtained location
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'fsq3agO3EAI9tSf5SCoyd0czUKTwQZp22Tqy+f5fp1rR77M='
          }
        };
        const url = `https://api.foursquare.com/v3/places/nearby?ll=${latitude},${longitude}`;

        fetch(url, options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));

      },
      error => {
        console.error('Error getting user location:', error);
      }
    );

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
