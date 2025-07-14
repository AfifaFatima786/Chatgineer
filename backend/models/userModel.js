const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trime:true,
        lowercase:true,
        minLength:[6,'Email must be 6 characters long'],
        maxLength:[50,'Email must not be longer then 50 characters long'],

    },
    password:{
        type:String,
        select:false

    }
})

userSchema.statics.hashPassword=async function(password){
    
    const hashedPassword= await bcrypt.hash(password,10);
    return hashedPassword
}


userSchema.methods.isValidPassword=async function(password){
    return await bcrypt.compare(password,this.password);
    
}


const User=mongoose.model('user',userSchema)
module.exports=User