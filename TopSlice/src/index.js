const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const client = require('./config/db');
const User = require('./models/dbModels').User;
const  bodyParser = require('body-parser');
const userRouter = require('./routes/index');

const app = express();
app.use(cors()); 
const port = 3000;

//call the DB
client();

app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

// routes
app.use('/api/topslice',userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});