const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
connectDB();
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true})); 
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user' , userRoutes);


app.use('/captain', captainRoutes)


module.exports =app;