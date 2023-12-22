const router = require('express').Router()
const apiControllers = require('../controllers/apiControllers')
const { ensureAuth, ensureNotAuth } = require('../middleware/authenticationMiddleware')

// Routes related to user data retrival and tree adoption
router.get('/dashboard', apiControllers.getUserDetails)
router.post('/adopt', apiControllers.adoptTree)

module.exports = router
