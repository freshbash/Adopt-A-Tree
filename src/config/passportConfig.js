const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcrypt')

// Local strategy for passport
passport.use(new LocalStrategy({ usernameField : 'email' }, async(email, password, done) => {
    const user = await User.findUserByEmail(email)
    if (user == null) {
        return done(null, false, {message: 'No user with that email'})
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, {message: 'password incorrect'})
        }
    } catch {
        return done(e)
    }
}))

//Store user data in session
passport.serializeUser((user, done) => done(null, user.id))

//Retrieve user data
passport.deserializeUser(async(id, done) => {
    const user = await User.findUserById(id);
    return done(null, user);
})

module.exports = passport
