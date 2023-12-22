const db = require('../config/databaseConfig')

//Methods to retrieve data from users table

//addUser(name, email, hash)
async function addUser(name, email, hash) {
    try {
        const query = `
            INSERT INTO users(name, email, password)
            VALUES ($1, $2, $3);
            `;

        await db.none(query, [name, email, hash]);
        console.log("User added");
    } catch(e) {
        console.log(e);
    }

}

//findUserByEmail(email)
async function findUserByEmail(email) {
    try {
        const user = await db.one('SELECT * FROM users WHERE email = $1', email);
        return user;
    } catch(e) {
        console.log(e);
        throw e;
    }
}
//findUserById(id)
async function findUserById(id) {
    try {
        const user = await db.one('SELECT * FROM users WHERE id = $1', id);
        return user;
    } catch(e) {
        console.log(e);
        throw e;
    }
}


module.exports = { addUser, findUserByEmail, findUserById }
