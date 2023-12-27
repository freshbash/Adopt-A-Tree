const router = require('express').Router()
const authenticationController = require('../controllers/authControllers')
const passport = require('../config/passportConfig')

//Routes related to user authentication

router.post('/login', passport.authenticate('local'), authenticationController.login)
router.post('/register', authenticationController.register)
router.post('/logout', authenticationController.logout)

module.exports = router
