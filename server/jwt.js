const jwt = require('jsonwebtoken')

// To generate JWT web token
const generateJwtToken = (userData) => {
    console.log("get request for token");
    return jwt.sign({userData}, process.env.JWT_SECRET);
}

module.exports = {generateJwtToken}