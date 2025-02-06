const express=require("express")
const {getUser}=require("../controller/userController")
const authMiddleware=require("../middleware/authmiddleware")

const router=express.Router()
router.get('/profile',authMiddleware,getUser)

module.exports=router