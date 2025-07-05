const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected!");
    }
    catch(error){
        console.log("\n\nDB Connection error:\n",error)
    }
}

module.exports = connectDB;