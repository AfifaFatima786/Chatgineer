const http=require('http')
const cookie = require('cookie');

const app=require('./app')
const dotenv=require('dotenv')
dotenv.config()
const socketIo=require('socket.io')
const { raw } = require('express')

const port=process.env.PORT || 3000;
const jwt=require('jsonwebtoken')

const server=http.createServer(app);


io=socketIo(server,{
        cors:{
            origin:['http://localhost:5173','http://localhost:3000'],
            methods:['GET','POST'],
            credentials: true
        }
    })

io.use((socket,next)=>{
    try{
        console.log("cokkie")
        const rawCookie = socket.request.headers.cookie;
        console.log(rawCookie)
        
        const parsedCookies = cookie.parse(rawCookie);
        const token = parsedCookies.token;
        console.log(token)

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

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});



server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})