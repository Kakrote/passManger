// const User = require("../models/User")

const getUser=async (req,res)=>{
    try{
        res.status(200).json({user:req.user})
    }
    catch(error){
        res.status(500).json({msg:"server error!"})
    }
}

module.exports={getUser}