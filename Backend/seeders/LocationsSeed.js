'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert locations into the 'Locations' table
    return queryInterface.bulkInsert('locations', [
      {
        address: 'Address1',
        name: 'Location1',
      },
      {
        address: 'Address2',
        name: 'Location2',
      },
      // Add more locations as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted locations from the 'Locations' table
    return queryInterface.bulkDelete('locations', null, {});
  }
};
