'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('password1', 10);

    // Insert a user into the 'Admin' table
    return queryInterface.bulkInsert('admins', [
      {
        username: 'admin1',
        password: hashedPassword,
        email: 'admin1@admin.org',
      },
      {
        username: 'admin2',
        password: hashedPassword,
        email: 'admin2@admin.org',
      },
      // Add more users as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted users from the 'Admin' table
    return queryInterface.bulkDelete('admins', null, {});
  }
};
