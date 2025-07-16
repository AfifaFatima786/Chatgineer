const express=require('express')
const {body}=require('express-validator')
const authMiddleware=require('../middleware/authMiddleware')
const projectController=require('../controller/projectController')

const router=express.Router()


router.post('/create',
    body('name').isString().withMessage('Name is required'),

    authMiddleware.authUser,

    projectController.createProjectController
)


router.get('/all',
    

    authMiddleware.authUser,

    projectController.getAllProjectController
)


router.put('/add-user',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({min:1}).withMessage('Users must be an array of Strings').bail().custom((users)=>users.every(user=>typeof user=='astring')).withMessage('Each user must be a string'),
    projectController.addUserToProjectController
)


router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectByIdController
)








module.exports= router;