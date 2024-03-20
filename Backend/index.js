require('dotenv').config()
const express = require('express');
const app = express();

// Add middleware, routes, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
