const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const UserSchema = new Schema ({

    name: String,
    age: Number,
    latitude: String,
    longitude: String,
    monthlyIncome: Number,
    experienced: Boolean,
    score: Number

});

module.exports = mongoose.model('users', UserSchema);