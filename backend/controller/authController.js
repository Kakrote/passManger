const User=require('../models/User')
const bycrpt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()

// registration User
const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        // finding user 
        const user=await User.findOne({email}).exec();
        if(user){
            return res.status(400).json({msg:"User alreay exist!!"});
        }
        // hasing the password
        const salt=await bycrpt.genSalt(10);
        const hashPassword=await bycrpt.hash(password,salt);
        // creating a new user
        const newUser=new User({
            name,
            email,
            password:hashPassword
        })
        await newUser.save();
        res.status(200).json({msg:"registration succesfull"})

    } 
    catch(error){
        console.log(error)
        res.status(500).json({msg:"server error"})
    }
}

// Login

const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email)
        console.log(password)
        // find user 
        const user=await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(400).json({msg:"user not found !!"});
        }
       console.log(user.email)
        console.log(user.password)
        // check if password matches
        const isMatch=await bycrpt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Wrong password"})
        }
        // genrate a token 
        const token=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    //     // setting cokiies
    //    res.cookie("token",token,{httpOnly:true,maxAge:60*60*1000})
       res.status(200).json({msg:"login sucessful"})

    }
    catch(error){
        console.log(error)
        res.status(500).json({msg:"server error"})
    }
}

// 🟢 Logout and Clear Cookie
const logoutUser = async (req, res) => {
    req.clear
    res.json({ message: "Logged out successfully" });
  };
  
  module.exports = { registerUser, loginUser, logoutUser };