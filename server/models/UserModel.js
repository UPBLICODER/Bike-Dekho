const mongoose = require('mongoose')

// blueprint or document k structure
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// model -> collection follow schema
const User = mongoose.model('User',userSchema);
module.exports = User