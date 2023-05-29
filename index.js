const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();
const routes = require('./routes/routes');
app.use(express.json());
app.use('/', routes); 
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});