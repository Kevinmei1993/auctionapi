const express = require('express')
const bcryptjs= require('bcryptjs')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')

//{} for mutilple functions
const {registerValidation,loginValidation}=require('../validations/validations')
//get user file
const User =require('../models/User')
const bcrypt = require('bcryptjs/dist/bcrypt')
//registeration endpoint
//enforce user to follow particular schema 
// validate body with validation function and send back results
//extract error message and wrap in readable format
router.post('/register',async(req,res)=>{
    
    const {error}=registerValidation(req.body)
    if(error){
        res.status(400).send({message:error['details'][0]['message']})
    }
//validate whether user exists 
    const userExists =await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }
//generate some randomness in key
    const salt =await bcryptjs.genSalt(5)
//take password from boody and hash it
    const hashedPassword=await bcryptjs.hash(req.body.password,salt)
//create new user and save data
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser= await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})
router.post('/login', async(req,res)=>{

//login endpoint,check user input and password
  const {error} = loginValidation(req.body)
  if(error){
    return res.status(400).send({message:error['details'][0]['message']})
}

// Validation 2 to check if user exists!
  const user = await User.findOne({email:req.body.email})
  if(!user){
        res.status(400).send({message:'User does not exist'})
} 

// Validation 3 to check user password
   const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
   if(!passwordValidation){
       return res.status(400).send({message:'Password is wrong'})
}
//when user successfull,generate auth token with user id
//send the token twice including to header to give access
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})

    
})
module.exports=router
