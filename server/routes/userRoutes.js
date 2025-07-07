const bcryptjs = require("bcryptjs");
const User = require('../models/UserModel');
const {generateJwtToken} = require('../jwt')
const express = require('express');
const router = express.Router()


router.post('/register',async (req,res)=>{
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            res.status(401).send({error:"All fields are required!",success:false})
        }

        const isEmailRegistered = await User.findOne({ email });
        if(isEmailRegistered) {
            res
              .status(401)
              .send({ error: "Email Id is already exist!",success:false});  
        }

        const hashPassword = await bcryptjs.hash(password,14);
        // new user create kar lia with help of model and schema
        const user = new User({ name, email, password: hashPassword });

        // user save kar do db m
        await user.save();

        // generate user JWT web token
        const jwtToken = generateJwtToken(user._id);

        res.status(201).send({success:true,message:"User registeration successfull!",user:user,token:jwtToken});

    }catch(error){
            res.status(500).send({error:error.message,success:false})
    }
})


router.post('/login',async (req,res)=>{
    try{
        const { email, password } = req.body;

        if(!email && !password){
            res.status(401).send({error:"All fields are required!",success:false})
        }

        // find one user by mail
        const user = await User.findOne({email});
        if(!user) res.status(401).send({error:"User not found",success:false})

        // compare password using bcrypt
        const isPasswordMatch = await bcryptjs.compare(password,user.password);

        if(!isPasswordMatch) res.status(401).send({error:"Incorrect Password",success:false})

        // generate JWTToken for user
        const jwtToken = generateJwtToken(user._id);
        res.status(200).send({message:"User Logged In Successfully!",user:user,token:jwtToken,success:true})
    }
    catch(error){
        res.status(500).send({error:error.message,success:false})
    }
})

module.exports = router;