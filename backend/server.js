const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')
const connectDB=require('./config/db')
const cookie=require('cookie-parser')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')

dotenv.config()
connectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use(cookie())

app.use("/api/auth", authRoutes);
app.use('/api/user',userRoutes);

const port=3000
app.listen(port,()=>{
    console.log(`listening the port http://localhost:${port}`)
})