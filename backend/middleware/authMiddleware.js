// const jwt=require('jsonwebtoken')
// const redisClient = require('../services/redisService')
// const cookieOptions = require('../utils/cookieOptions')

// module.exports.authUser=async (req,res,next)=>{
//     try{
//         const token=req.cookies.token
//         console.log(token)

//         if(!token){
//             return res.status(401).send({error:'Unauthorised User'})

//         }

//         const isBlacklisted=await redisClient.get(token)


//         if(isBlacklisted){

//             res.clearCookie('token',{...cookieOptions,maxAge: 0})


//             return res.status(401).send({error:'Unauthorised User'})
//         }

//         const decoded=jwt.verify(token,process.env.JWT_SECRET)
//         console.log("decoded")
//         console.log(decoded)

//         req.user=decoded;

//         next();

//     }
//     catch(error){
//         res.status(400).send({error:'Please authenticate'})
//     }

// }




// const jwt=require('jsonwebtoken')
// const redisClient = require('../services/redisService')
// const cookieOptions = require('../utils/cookieOptions')

// module.exports.authUser=async (req,res,next)=>{
//     try{
//         const token=req.cookies.token
//         console.log('Token received:', token ? 'Present' : 'Missing')

//         if(!token){
//             return res.status(401).json({error:'Unauthorised User - No token provided'})
//         }

//         const isBlacklisted=await redisClient.get(token)

//         if(isBlacklisted){
//             res.clearCookie('token',{...cookieOptions,maxAge: 0})
//             return res.status(401).json({error:'Unauthorised User - Token blacklisted'})
//         }

//         const decoded=jwt.verify(token,process.env.JWT_SECRET)
//         console.log("Token decoded successfully for user:", decoded.email)

//         req.user=decoded;
//         next();

//     }
//     catch(error){
//         console.error('Auth middleware error:', error.message)
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({error:'Invalid token'})
//         }
//         if (error.name === 'TokenExpiredError') {
//             res.clearCookie('token',{...cookieOptions,maxAge: 0})
//             return res.status(401).json({error:'Token expired'})
//         }
//         res.status(400).json({error:'Authentication failed'})
//     }
// }


// const jwt=require('jsonwebtoken')
// const redisClient = require('../services/redisService')
// const cookieOptions = require('../utils/cookieOptions')

// module.exports.authUser=async (req,res,next)=>{
//     try{
//         const token=req.cookies.token
//         console.log(token)

//         if(!token){
//             return res.status(401).send({error:'Unauthorised User'})

//         }

//         const isBlacklisted=await redisClient.get(token)


//         if(isBlacklisted){

//             res.clearCookie('token',{...cookieOptions,maxAge: 0})


//             return res.status(401).send({error:'Unauthorised User'})
//         }

//         const decoded=jwt.verify(token,process.env.JWT_SECRET)
//         console.log("decoded")
//         console.log(decoded)

//         req.user=decoded;

//         next();

//     }
//     catch(error){
//         res.status(400).send({error:'Please authenticate'})
//     }

// }




const jwt=require('jsonwebtoken')
const redisClient = require('../services/redisService')
const cookieOptions = require('../utils/cookieOptions')

module.exports.authUser=async (req,res,next)=>{
    try{
        console.log('=== AUTH MIDDLEWARE DEBUG ===')
        console.log('Request URL:', req.originalUrl)
        console.log('Request Method:', req.method)
        console.log('Request Cookies:', req.cookies)
        
        const token=req.cookies.token
        console.log('Token received:', token ? 'Present' : 'Missing')
        console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'N/A')

        if(!token){
            console.log('ERROR: No token found in cookies')
            return res.status(401).json({error:'Unauthorised User - No token provided'})
        }

        let isBlacklisted = false
        try {
            isBlacklisted = await redisClient.get(token)
            console.log('Token blacklisted status:', isBlacklisted ? 'YES' : 'NO')
        } catch (redisError) {
            console.warn('Redis check failed, continuing without blacklist check:', redisError.message)
            isBlacklisted = false
        }

        if(isBlacklisted){
            res.clearCookie('token',{...cookieOptions,maxAge: 0})
            return res.status(401).json({error:'Unauthorised User - Token blacklisted'})
        }

        console.log('Verifying JWT token...')
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("Token decoded successfully for user:", decoded.email)
        console.log("Token payload:", decoded)

        req.user=decoded;
        console.log('=== AUTH SUCCESS ===')
        next();

    }
    catch(error){
        console.error('=== AUTH MIDDLEWARE ERROR ===')
        console.error('Error type:', error.name)
        console.error('Error message:', error.message)
        console.error('Full error:', error)
        
        if (error.name === 'JsonWebTokenError') {
            console.log('ERROR: Invalid JWT token')
            return res.status(401).json({error:'Invalid token'})
        }
        if (error.name === 'TokenExpiredError') {
            console.log('ERROR: Token expired')
            res.clearCookie('token',{...cookieOptions,maxAge: 0})
            return res.status(401).json({error:'Token expired'})
        }
        console.log('ERROR: General authentication failure')
        res.status(400).json({error:'Authentication failed'})
    }
}

