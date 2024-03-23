const db = require('../models');
const { Users } = db;

(async () => {
  try {
    // Create a new user instance
    const newUser = {
      username: 'example_user',
      password: 'password1',
      email: 'example@example.com',
      city_state: 'Example City, Example State'
    };

    // Add the user to the database
    const user = await Users.create(newUser);
    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
})();
