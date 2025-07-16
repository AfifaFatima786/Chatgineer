const projectModel=require('../models/projectModel')
const projectService=require('../services/projectServices')
const {validationResult}=require('express-validator')

module.exports.createProjectController=async(req,res)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }

    try{

    const {name}=req.body;
    const userId=req.user._id;

    console.log(name)
    console.log(userId)

    const newProject=await projectService.createProject({name,userId})

    res.status(201).json(newProject)}
    catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }

}


module.exports.getAllProjectController=async(req,res)=>{
    try{

        const userId=req.user._id
        console.log(userId)

        const allUserProjects=await projectService.getAllProjectsByUserId(userId)

        console.log(allUserProjects)


        return res.status(200).json({projects:allUserProjects})

    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err.message})
    }
}

module.exports.addUserToProjectController=async (req,res)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }

    try{

        const {projectId,users}=req.body;

        const project=await projectService.addUsersToProject({
            projectId,
            users,
            userId:req.user._id
        })

        return res.status(200).json({project})


    }catch(err){
        console.log(err)
        res.status(400).json({error:err.message})
    }


}


module.exports.getProjectByIdController=async (req,res)=>{

    const {projectId}=req.params

    try{
        const project=await projectService.getProjectByIdController({projectId})

        return res.status(200).json({project})
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err.message})
    }


}
