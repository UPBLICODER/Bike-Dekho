const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next) =>{
    console.log("Authenicate kar raha hu user ko....");
    const authorizationVal = req.headers.authorization;
    console.log(authorizationVal);
    const token = authorizationVal.split(' ')[1];

    try{
        console.log("verifying token....");
        // verify the token using jwt method
        const isVerified = jwt.verify(token,process.env.JWT_SECRET);
        console.log(isVerified);
        if(!isVerified) res.status(401).send({error:"Un Authorized user",success:false})
        next();
    }
    catch(error){
        console.log(error.message);
        res.status(401).send({error:error.message,success:false})
    }
}


// To generate JWT web token
const generateJwtToken = (userData) => {
    console.log("get request for token");
    return jwt.sign({userData}, process.env.JWT_SECRET);
}

module.exports = {generateJwtToken,jwtAuthMiddleware}