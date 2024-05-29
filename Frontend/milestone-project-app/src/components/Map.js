import React, { useEffect, useState, useContext } from 'react';
import CommentCard from './commentCard'
import mapboxgl from 'mapbox-gl';
import { CurrentUser } from '../contexts/CurrentUser'

// import ReviewForm from './NewCommentForm'

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGZvdW50MSIsImEiOiJjbHU3a2Z3NGgwNzZhMmhwYml1Yng2dDM3In0.hB1Wb6OFmMYNv5gTBXAF-g';

const Map = () => {
  const { currentUser } = useContext(CurrentUser)
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(null); // Define map state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Define selected restaurant state
  const [ratings, setRatings] = useState(
    {
      rating: 5,
      rating_description: '',
    }
  );
  const [comment, setComment] = useState('');



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

  //get comment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3001/reviews/${selectedRestaurant.fsq_id}`;
        const response = await fetch(url);
        const data = await response.json();

        setComment(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedRestaurant]);

  //creat review function 

  async function handleSubmit(e) {

    try {
      // debugger
      e.preventDefault(e)
      const formData = {
        // Construct the data object from the form inputs
        rating: ratings.rating,
        rating_description: ratings.rating_description,
        location_id: selectedRestaurant.fsq_id,
        user_id: currentUser.user_id
        // Add other necessary fields here
      };
      // Call the API with formData
      const response = await fetch(`http://localhost:3001/reviews/${selectedRestaurant.fsq_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const review = await response.json()
      setRatings({
        ...ratings,
        reviews: review
      })
      console.log("review: ", review)
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }


  async function deleteReview(deletedReview) {
    await fetch(`http://localhost:3001/reviews/${selectedRestaurant.fsq_id}/review/${deletedReview.review_id}`, {
      method: 'DELETE'
    })
  }





  //showing comments logic 
  let comments = (
    <h3 className="inactive">
      No comments yet!
    </h3>
  )
  let reviews = (
    <h3 className="inactive">
      Not yet rated
    </h3>
  )
  if (Array.isArray(comment) && comment.length) {
    let sumRatings = comment.reduce((tot, c) => {
      return tot + c.rating
    }, 0)
    let averageRating = Math.round(sumRatings / comment.length)
    let stars = ''
    for (let i = 0; i < averageRating; i++) {
      stars += '⭐️'
    }
    reviews = (
      <h3>
        {stars}
      </h3>
    )
    comments = comment.map(comment => {
      return (
        <CommentCard key={comment.review_id} comment={comment} onDelete={() => deleteReview(comment)} />
      )
    })
  }

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


  function ReviewForm() {
    if (!currentUser) {
      return <p>You must be logged in to review</p>
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={ratings.rating}
              onChange={e => setRatings({ ...ratings, rating: e.target.value })}
              min="1"
              max="10" />
          </div>
          <div>
            <label htmlFor="rating_description">Comments:</label>
            <textarea
              id="rating_description"
              name="rating_description"
              value={ratings.rating_description}
              placeholder='Enter Comment'
              onChange={e => setRatings({ ...ratings, rating_description: e.target.value })} />
          </div>
          <div>
            <label htmlFor='location_id' hidden />
            <input id="location_id" name="location_id" value={selectedRestaurant.fsq_id} disabled hidden />
            <label htmlFor="user_id" />
            <input id="user_id" name="user_id" value={currentUser.user_id} disabled hidden />
          </div>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', background: '#f8d7da', color: '#721c24', textAlign: 'center', padding: '10px 0' }}>
        We are aware of some bugs in the app and are working diligently to get it resolved. We thank you for your patience -Dev Team
      </div>
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
          {reviews}
          <ReviewForm />
          <div className="row">
            <h2>Comments</h2>
            {comments}
          </div>
        </div>

      )
      }


    </div>
  );
};

export default Map;