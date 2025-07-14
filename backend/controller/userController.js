
const userService=require("../services/userService")
const generateToken = require ("../utils/generateToken")
const userModel=require('../models/userModel')
const cookieOptions=require("../utils/cookieOptions")

const {validationResult}= require('express-validator')

module.exports.createUserController=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   

    const check=await userModel.find({email:req.body.email})
    if(check)
    return res.status(500).json("Invalid Email or Password")
    

    try{
        const user=await userService.createUser(req.body);
        

        const token=await generateToken(user);
        res.cookie("token",token,cookieOptions)
        res.status(201).json({user,token});
    }catch(error){
        console.log('error')
        res.send(4000).send(error.message)
    }

}

module.exports.loginUserController=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    console.log(req.body)
   

    

    try{
        const user=await userService.loginUser(req.body);
        console.log(user+"controller ka")
        

        const token=await generateToken(user);
        res.cookie("token",token,cookieOptions)
        res.status(201).json({user,token});
    }catch(error){
        console.log('error')
        res.status(400).send(error.message)
    }

}

module.exports.profileUserController=async(req,res)=>{
 
    try{

        console.log(req.user)
        res.status(201).json({user:req.user});
    }catch(error){
        console.log('error')
        res.status(400).send(error.message)
    }

}