//Load invironment variables in development mode
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
app.use(express.json())

const passport = require("passport")
const session = require('express-session')
const routes = require('./routes')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

module.exports = app
