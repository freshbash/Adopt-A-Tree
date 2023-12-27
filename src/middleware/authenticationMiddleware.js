function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next(req, res)
    } else {
        return res.status(403).json({message: 'fail'})
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(403).json({message: 'fail'})
    } else {
        return next()
    }
}

module.exports = { checkAuthenticated, checkNotAuthenticated }
