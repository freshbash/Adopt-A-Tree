const db = require('../config/databaseConfig')

//Methods to retrieve data from trees table

//getTreeByUserId(userid)
async function getTreeCountByUserId(userid) {
    try {
        const treeCount = await db.one('SELECT COUNT(*) FROM trees WHERE owner = $1', userid);
        return +treeCount.count;
    } catch(e) {
        console.log(e);
        throw e;
    }
}
//getTreeCount()
async function getTreeCount() {
    try {
        const treeCount = await db.one('SELECT COUNT(*) FROM trees');
        return +treeCount.count;
    } catch(e) {
        console.log(e);
        throw e;
    }
}
//addTree(userid)
async function addTree(userid) {
    try {
        await db.none('INSERT INTO trees(owner) VALUES ($1)', userid);
        console.log('tree added');
    } catch(e) {
        console.log(e);
        throw e;
    }
}


module.exports = { getTreeCountByUserId, getTreeCount, addTree }

