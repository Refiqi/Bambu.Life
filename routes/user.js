// Importing Express Module

const express = require('express');

// Using Express Router Function
const router = express.Router();

// Importing Models Schema from Database
const User = require('../models/User');

router.get('/', (req, res)=>{
    res.send('Hello')
})

router.get('/people-like-you', (req, res)=>{

    User.find({})
    .limit(10)
    .then(users=>{
        res.send(users);
    })

})


module.exports = router;