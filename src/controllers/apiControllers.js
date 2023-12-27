const User = require('../models/users')
const Tree = require('../models/trees')

const apiControllers = {
    getUserDetails: async(req, res) => {
        //Logic to get all information related to req.user
        if (!req.isAuthenticated()) return res.status(403).json({message: 'fail'})
        try{
            let donator = {};
            const user = await User.findUserById(req.user.id);
            donator.name = user.name;

            const donatorTrees = await Tree.getTreeCountByUserId(req.user.id);
            const totalTrees = await Tree.getTreeCount();

            const share = (donatorTrees / totalTrees * 100).toFixed(2);

            donator.numTrees = donatorTrees;
            donator.share = share + "%";

            return res.status(200).json({message: 'success', userData: donator})
        }
        catch(e) {
            console.log(e);
            return res.status(500).json({message: 'fail'})
        }
    },
    adoptTree: async(req, res) => {
        //Get data from json, add the tree(s) to the trees table, attribute them to req.user
        /*
            json format:
                {
                    count: (Number)
                }
                */
        if (!req.isAuthenticated()) return res.status(403).json({message: 'fail'})
        try {
            const count = req.body.count;

            for (let i = 0; i < count; i++) {
                await Tree.addTree(req.user.id);
            }
            return res.status(201).json({message: 'success', redirectTo: '/api/dashboard'})
        }
        catch {
            return res.status(400).json({message: 'fail'})
        }
    }
}

module.exports = apiControllers;
