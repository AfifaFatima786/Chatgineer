const jwt=require('jsonwebtoken')

module.exports.authUser=(req,res,next)=>{
    try{
        const token=req.cookies.token
        console.log(token)

        if(!token){
            res.status(400).send({error:'Please authenticate'})

        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)

        req.user=decoded;

        next();

    }
    catch(error){
        res.status(400).send({error:'Please authenticate'})
    }
}