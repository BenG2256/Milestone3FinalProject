'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('password1', 10);

    // Insert a user into the 'Users' table
    return queryInterface.bulkInsert('users', [
      {
        username: 'admin1',
        password: hashedPassword,
        email: 'admin1@example.com',
        city_state: 'City1, State1',
        role: 'admin'
      },
      {
        username: 'admin2',
        password: hashedPassword,
        email: 'admin2@example.com',
        city_state: 'City2, State2',
        role: 'admin'
      },
      // Add more as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted users from the 'Users' table
    return queryInterface.bulkDelete('users', null, {});
  }
};
