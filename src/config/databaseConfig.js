if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const connectionObject = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
}

const pgp = require('pg-promise')();

const db = pgp(connectionObject);


module.exports = db;
