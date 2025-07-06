const express = require("express");
const connectDB = require('./config/db');
require('dotenv').config() // load env config
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(express.json());

// connect with database
connectDB();

// routes
app.use('/user',userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`\n\nAPI server listening on port ${port}`);
});