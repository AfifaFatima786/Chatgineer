const projectModel=require("../models/projectModel");



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