const Router=require('express')
const router=Router()
const aiController=require('../controller/aiController')

router.get('/get-result',aiController.getResult)

module.exports=router