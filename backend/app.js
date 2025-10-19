const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
//const morgan = require('morgan');
dotenv.config();


const connect = require('./db/db');
connect();

const userRoutes = require('./routes/userRoutes');

const projectRoutes=require('./routes/projectRoutes')
const aiRoutes=require('./routes/aiRoutes')


const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://13.62.105.209:31000', 'https://chatgineer.vercel.app'],
  credentials: true
}));




// app.options('*', cors({
//   origin: 'https://chatgineer.vercel.app',
//   credentials: true
// }));



// app.use(morgan('dev'));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/projects',projectRoutes)
app.use('/ai',aiRoutes)

app.get('/', (req, res) => {
    res.send('Hello world');
});

module.exports = app;

