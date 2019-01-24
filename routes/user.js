// Importing Express Module

const express = require("express");

// Using Express Router Function

const router = express.Router();

// Importing Models Schema from Database

const User = require("../models/User");

// Using helpers for Rounding up decimal score

const { round } = require("../helpers/round.js");

// Using String-similarity for Scoring similar String

const similarity = require("string-similarity");

// Root Router for API

router.get("/", (req, res) => {
  res.render('home');
});

// Query for Database

router.get("/people-like-you", (req, res) => {
  let query = [];

// Making The Query Optional

  if (req.query.age) {
    query.push({
      age: {
        $gte: Math.max(0, req.query.age - 2),
        $lte: parseInt(req.query.age) + 2
      }
    });
  }

  if (req.query.latitude) {
    query.push({
      latitude: {
        $gte: req.query.latitude - 2,
        $lte: parseInt(req.query.latitude) + 2
      }
    });
  }

  if (req.query.longitude) {
    query.push({
      longitude: {
        $gte: req.query.longitude - 2,
        $lte: parseInt(req.query.longitude) + 2
      }
    });
  }

  if (req.query.monthlyIncome) {
    query.push({
      monthlyIncome: {
        $gte: req.query.monthlyIncome - 500,
        $lte: parseInt(req.query.monthlyIncome) + 500
      }
    });
  }

  // Declaring a global Variable that will store The Scored user
  let scoredUser;

  // Query in Database with Find method and $and Operator

  User.find({
    $and: query
  })
    .limit(10)
    .then(users => {
      users.forEach(function(user) {
        hitScore = round([similarity.compareTwoStrings(user.toString(), JSON.stringify(query))],1);
        user.score = hitScore + 0.5;
        scoredUser = users;
      });

      // Sorting Score Descending If there's a Match

      if (scoredUser) {
      scoredUser.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        // Sending The Data as JSON to API
        let peopleLikeYou = {
            peopleLikeYou : scoredUser
            }
        res.send(peopleLikeYou);

      } else {
            // If There's no match then Will throw this error message

          res.status(422).send({peopleLikeYou: "There's no Match for people you searched"})

      }

      // If There's no Query Given It Will Throw An Error Message

    }).catch(err=>{
        if (err) res.send('Error: Please Enter at lease one field query')
    });
});

module.exports = router;
