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




module.exports= router;