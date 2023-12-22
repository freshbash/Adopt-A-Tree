const User = require('../models/users')
const Tree = require('../models/trees')

const apiControllers = {
    getUserDetails: async(req, res) => {
        //Logic to get all information related to req.user
        try{
            let donator = {};
            const user = await User.findUserById(req.user.id);
            donator.name = user.name;

            const donatorTrees = await Tree.getTreeCountByUserId(req.user.id);
            const totalTrees = await Tree.getTreeCount();

            const share = donatorTrees / totalTrees * 100;

            donator.numTrees = donatorTrees;
            donator.share = share + "%";

            res.status(200).json({message: 'success', userData: donator})
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'fail'})
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


        try {
            const count = req.body.count;

            for (let i = 0; i < count; i++) {
                await Tree.addTree(req.user.id);
            }
            res.status(201).json({message: 'success', redirectTo: '/api/dashboard'})
        }
        catch {
            res.status(400).json({message: 'fail'})
        }
    }
}

module.exports = apiControllers;
