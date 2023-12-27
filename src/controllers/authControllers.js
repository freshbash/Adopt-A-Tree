// Import necessary dependencies
const bcrypt = require("bcrypt");
const User = require('../models/users');

// functions for user authentication
const authController = {
    login: (req, res) => {
        res.status(200).json({ message: 'success', redirectTo: '/api/dashboard' })
    },
    register: async (req, res) => {
        if (req.isAuthenticated()) return res.status(403).json({message: 'fail'})
        try {
            const { name, email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            await User.addUser(name, email, hashedPassword);
            return res.status(201).json({message: "success"})
        } catch(e) {
            return res.status(400).json({message: 'fail'})
        }
    },
    logout: (req, res, next) => {
        if (!req.isAuthenticated()) return res.status(403).json({message: 'fail'})
        req.logout((err) => {
            if (err) { return next(err) }
        })
        res.status(200).json({message: "logged out"})
    }
};

module.exports = authController;