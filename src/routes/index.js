const router = require('express').Router()
const authRoutes = require('./authRoutes')
const apiRoutes = require('./apiRoutes')

router.use('/user', authRoutes)
router.use('/api', apiRoutes)

module.exports = router
