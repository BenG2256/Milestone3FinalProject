import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGZvdW50MSIsImEiOiJjbHU3a2Z3NGgwNzZhMmhwYml1Yng2dDM3In0.hB1Wb6OFmMYNv5gTBXAF-g';

const Map = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(null); // Define map state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Define selected restaurant state
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');


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
    const fetchData = async () => {
      try {
        const url = `http://localhost:3001/reviews/${selectedRestaurant.fsq_id}`;
        const response = await fetch(url);
        const data = await response.json();

        setComments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedRestaurant]);

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

  const handleRatingChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }
    setRating(value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit rating and comments
    console.log("Rating:", rating);
    console.log("Comments:", comments);
    // Reset rating and comments fields
    setRating('');
    setComments('');
  };

  console.log("location id from backend", comments[0].rating)
  console.log("location id from backend", comments[0].rating_description)
  console.log("location id from backend", comments[0].user_id)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div id="map" style={{ width: '90%', maxWidth: '800px', height: '400px', marginBottom: '20px' }} />
      <div style={{ width: '90%', maxWidth: '800px', overflowX: 'auto' }}>
        <h2>Restaurants Near You:</h2>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {restaurants.map((restaurant, index) => (
            <li key={`${restaurant.name}-${index}`} style={{ marginRight: '10px' }}>
              <button onClick={() => handleRestaurantClick(restaurant)}>{restaurant.name}</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRestaurant && (
        <div style={{ width: '90%', maxWidth: '800px' }}>
          <h2>{selectedRestaurant.name}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input type="number" id="rating" name="rating" value={rating} onChange={handleRatingChange} min="1" max="10" />
            </div>
            <div>
              <label htmlFor="comments">Comments:</label>
              <textarea id="comments" name="comments" value={comments} onChange={handleCommentsChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Map;