const express = require("express");
const connectDB = require('./config/db');
require('dotenv').config() // load env config
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes');
const {jwtAuthMiddleware} = require('../server/jwt')
const cors = require('cors')

const app = express();
app.use(express.json());

// connect with database
connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);

app.get('/', jwtAuthMiddleware, async (req,res)=>{
    res.send("authenticated");
})

app.use('/api',productRoutes)

// routes
app.use('/user',userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`\n\nAPI server listening on port ${port}`);
});