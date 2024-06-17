const mongoose = require('mongoose');
const url = 'mongodb://localhost/TopSlice';
const dbName = 'TopSlice';

var db;
async function client(){
   // Connect to MongoDB
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = client;