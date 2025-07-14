const express=require('express')
const morgan=require('morgan')
const dotenv=require('dotenv')
dotenv.config()
const connect=require('./db/db')


connect()


const userRoutes=require('./routes/userRoutes')



const app=express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/users',userRoutes)


app.get('/',(req,res)=>{
    res.send('Hellow world');
})

module.exports=app;


