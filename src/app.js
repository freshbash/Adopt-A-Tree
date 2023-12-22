require('dotenv').config()

//Import express
const express = require('express')
const app = express()

//Load json middleware
app.use(express.json())


const passport = require("passport")
const session = require('express-session')
const routes = require('./routes')

//In memory session store
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//Initialize passport
app.use(passport.initialize())

//Middleware for session based authentication
app.use(passport.session())

//All incoming requests go through here
app.use('/', routes)

//Detect any internal server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

module.exports = app
