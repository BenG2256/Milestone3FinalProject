'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert reviews into the 'Reviews' table
    return queryInterface.bulkInsert('reviews', [
      {
        rating: 5,
        rating_description: 'Excellent experience',
        author_id: 1, // Assuming user_id 1 corresponds to user1
        location_id: 2, // Assuming location_id 1 corresponds to Location1
      },
      {
        rating: 4,
        rating_description: 'Good service',
        author_id: 2, // Assuming user_id 2 corresponds to user2
        location_id: 1, // Assuming location_id 2 corresponds to Location2
      },
      // Add more reviews as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted reviews from the 'Reviews' table
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
