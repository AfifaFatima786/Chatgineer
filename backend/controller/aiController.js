const aiServices=require('../services/aiServices')


module.exports.getResult=async(req,res)=>{
    try{
        const {prompt}=req.query;
        const result=await aiServices.generateResult(prompt);
        res.send(result)

    }catch(error){
        console.log("yha h error")
        res.status(500).send({message:error.message})
    }
}