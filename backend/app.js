const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/social_app').then(()=> {
    console.log('mongoDB connect successfully');
});
