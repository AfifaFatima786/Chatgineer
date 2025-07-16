const projectModel=require("../models/projectModel");
const mongoose=require('mongoose')



module.exports.createProject=async ({
    name,userId          /*Id of user who created the project*/
})=>{

    console.log(name)

    if(!name){
        throw new Error('Name is required')
    }

    if(!userId){
        throw new Error('User is required')
    }

    const project=await projectModel.create({
        name,
        users:[userId]
    })

    return project;


}


module.exports.getAllProjectsByUserId=async (userId)=>{
    if(!userId){
        throw new Error('UserId is required')
    }
    console.log(userId)

    const allUserProjects=await projectModel.find({users:userId})

    console.log("services me")
    console.log(allUserProjects)

    return allUserProjects

}


module.exports.addUsersToProject=async ({projectId,users,userId})=>{

    /*userId is of that user who is trying to add other users to the project*/
    if(!projectId){
        throw new Error('ProjectId is required')
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId")

    }

     if(!userId){
        throw new Error('UserId is required')
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid UserId")

    }
   
    if(!users){
        throw new Error('Users are required')
    }

    if(!Array.isArray(users) || users.some(userId=>!mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid userId in users array")
    }

    const project=await projectModel.findOne({
        _id:projectId,
        users:userId
    })         /*Also checks whether this userId is among users in that project or not*/

    if(!project){
        throw new Error("User not belong to this project ")
    }

    const updatedProject=await projectModel.findOneAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{
        new:true
    })

    return updatedProject



}


module.exports.getProjectByIdController=async ({projectId})=>{

    
    if(!projectId){
        throw new Error('ProjectId is required')
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId")

    }


    const project=await projectModel.findOne({
        _id:projectId
    }).populate('users')

    return project;



}