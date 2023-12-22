const db = require('../config/databaseConfig')

async function createTables() {
  try {
    await db.none(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      )
    `);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }

  try {
    await db.none(`
      CREATE TABLE trees (
        id SERIAL PRIMARY KEY,
        owner INTEGER REFERENCES users(id)
      )
    `);
    console.log('Tree table created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

module.exports = createTables;
