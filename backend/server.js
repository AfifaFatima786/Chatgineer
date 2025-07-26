const http=require('http')
const cookie = require('cookie');


const app=require('./app')
const dotenv=require('dotenv')
dotenv.config()
const socketIo=require('socket.io')
const { raw } = require('express')
const axios = require('axios');




const port=process.env.PORT || 3000;
const jwt=require('jsonwebtoken')

const server=http.createServer(app);
const mongoose=require('mongoose')
const projectModel=require('./models/projectModel')
const aiServices =require('./services/aiServices')


io=socketIo(server,{
        cors:{
            origin:['http://localhost:5173','http://localhost:3000'],
            methods:['GET','POST'],
            credentials: true
        }
    })

io.use(async (socket,next)=>{
    try{
        console.log("cokkie")
        const rawCookie = socket.request.headers.cookie;
       
        
        const parsedCookies = cookie.parse(rawCookie);
        const token = parsedCookies.token;
        console.log(token)
        const projectId = socket.handshake.query.projectId;
        console.log("Project ID:", projectId);

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid projectId'))
        }

        socket.project=await projectModel.findById(projectId)

       


        if(!token){
            console.log("token ni mila")
            return next(new Error('Authentication error'))

        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return next(new Error('Authentication error'))
        }

        socket.user=decoded;
        next();



    }catch(error){
        next(error)
    }
})


io.on('connection', socket => {
    console.log('connected server')
    socket.roomId=socket.project._id.toString();

    socket.join(socket.roomId)  
       /* imp-specific room*/
       console.log(socket.project._id.toString())

    socket.on('project-message',async data=>{

        const message=data.message


         console.log(data)
        socket.broadcast.to(socket.roomId).emit('project-message',data)

        const aiIsPresentInMessage=message.includes('@ai')

        if(aiIsPresentInMessage){

            const prompt=message.replace('@ai','')
           
            const result=await aiServices.generateResult(prompt)
            
            io.to(socket.roomId).emit('project-message',{
                message:result,
                sender:{
                    _id:'ai',
                    email:'AI'
                }

            })
        }

       
    })




  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
    console.log("user disconnected")
    socket.leave(socket.roomId)

   });
});


app.post('/execute', async (req, res) => {
  const { script, language, versionIndex,stdin } = req.body;

  console.log(process.env.JDOODLE_CLIENT_ID)

  try {
    const result = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script,
      language,
      versionIndex,
      stdin
    });

    res.json(result.data);
  } catch (err) {
    console.error('JDoodle API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Code execution failed' });
  }
});




server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})