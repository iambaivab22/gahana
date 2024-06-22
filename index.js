// Import the express module
const express = require("express");

// Create an instance of express
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
