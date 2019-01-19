// Importing Secret Keys with dotenv Module for Development
// And The Keys in The Heroku is The same as Well so it can work in Production too.

require('dotenv').config();
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

module.exports = {

    mongoDbURI: `mongodb://${user}:${password}@ds161134.mlab.com:61134/bambu`

};