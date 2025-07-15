const jwt=require('jsonwebtoken')
const redisClient = require('../services/redisService')
const cookieOptions = require('../utils/cookieOptions')

module.exports.authUser=async (req,res,next)=>{
    try{
        const token=req.cookies.token
        console.log(token)

        if(!token){
            return res.status(401).send({error:'Unauthorised User'})

        }

        const isBlacklisted=await redisClient.get(token)


        if(isBlacklisted){

            res.clearCookie('token',{...cookieOptions,maxAge: 0})


            return res.status(401).send({error:'Unauthorised User'})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("decoded")
        console.log(decoded)

        req.user=decoded;

        next();

    }
    catch(error){
        res.status(400).send({error:'Please authenticate'})
    }
}