const mongoose=require('mongoose')
require('dotenv').config
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            // useNewURLParser:true,
            // useUnifiedTopology:true,
        })
        console.log("connected to mongoDB succesfully")
    }
    catch(e){
        console.log(e)
    }
}

module.exports=connectDB 