
const userModel= require ("../models/userModel")


module.exports.createUser=async({
    email,password
})=>{
    if(!email|| !password){
        throw new Error('Email and password are required')
    }
   

    const hashedPassword=await userModel.hashPassword(password)
    

    const user=await userModel.create({
        email,
        password:hashedPassword
    })
    return user;
}

module.exports.loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await userModel.findOne({ email }).select('+password');
    
    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    const isValid = await user.isValidPassword(password);
   
    if (!isValid) {
        throw new Error("Invalid Email or Password");
    }

    return user;
};


module.exports.getAllUsers=async ({userId})=>{
    const users=await userModel.find({
        _id:{ $ne : userId}
    });
    return users;
}