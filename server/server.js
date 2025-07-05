const express = require("express");
const connectDB = require('./config/db');
require('dotenv').config() // load env config

const app = express();

// connect with database
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`\n\nAPI server listening on port ${port}`);
});