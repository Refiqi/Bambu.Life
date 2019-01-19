// Importing Express Module

const express = require('express');

// Using Express Module

const app = express();

// Importing Body Parser for Parsering the data to Json and urlencoded

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connecting to Our Remote Database with mLab

const mongoose = require('mongoose');
const { mongoDbURI } = require('./config/database');

mongoose.connect(mongoDbURI, { useNewUrlParser: true }, err => {
    if (err) throw err;
    console.log('MongoDB Connected')
});







// Port For Deploying to heroku or Localhost

const port = process.env.PORT || 5000

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`Server is running at port ${port}`)
});