const router = require('express').Router()
const passport = require('../config/passportConfig')
const authenticationController = require('../controllers/authControllers')
const { ensureAuth, ensureNotAuth } = require('../middleware/authenticationMiddleware')

router.post('/login', passport.authenticate('local'), authenticationController.login)
router.post('/register', authenticationController.register)
router.post('/logout', authenticationController.logout)

module.exports = router
