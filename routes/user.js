// Importing Express Module

const express = require('express');

// Using Express Router Function
const router = express.Router();

// Importing Models Schema from Database
const User = require('../models/User');

// Using Leven NPM

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const similarity = require('string-similarity');

router.get('/', (req, res)=>{
   
    let query = {};

    if (req.query.age) {
        query.age = req.query.age;
    }
    if(req.query.latitude) {
        query.latitude = req.query.latitude;
    }
    if(req.query.monthlyIncome) {
        query.monthlyIncome = req.query.monthlyIncome;
    }
    if (req.query.longitude) {
        query.longitude = req.query.longitude;
    }
    if(req.query.experienced) {
        query.experienced = req.query.experienced;
    }

    User.find({
        $or: [
            { age: { $gte: query.age - 2, $lte: query.age + 2 } },
            { latitude: { $gte: query.latitude - 2, $lte: query.latitude } },
            { longitude: { $gte: query.longitude - 2, $lte: query.longitude + 2 } },
            { monthlyIncome: { $gte: query.monthlyIncome -500, $lte: query.monthlyIncome + 500 } },
            { experienced: query.experienced} 
        ]
    })
    .limit(1000)
    .then(users=>{
        res.send(users)
        // users.forEach(function(user) {
        //     score = round([similarity.compareTwoStrings(user.toString(), JSON.stringify(query))],1);
        //     console.log(user)
            
        //     let criteria = {
        //         _id: { $in: user._id}
        //     };
        //     User.update(criteria, { score: score }, { multi: true },function (err,result) {
        //         if (err) console.log(err);
        //     })
        // });
        // User.find({})
        // .sort({'score': -1})
        // .limit(10)
        // .then(user=>{
        //     res.send(user)
        // });
    });
});
//             user.update({_id: user.id}, { $set: { score: score }});

router.get('/people-like-you', (req, res)=>{

    User.find({})
    .limit(10)
    .then(users=>{
        res.send(users);
    })

});


module.exports = router;