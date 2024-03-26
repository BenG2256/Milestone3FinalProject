import React from 'react';

const RestaurantList = ({ restaurants }) => {
  return (
    <div>
      <h2>Restaurants Nearby:</h2>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index}>
            <strong>{restaurant.name}</strong> - {restaurant.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
