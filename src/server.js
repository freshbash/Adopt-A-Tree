//Entry point of the application


require('dotenv').config()

const app = require('./app')
const createTables = require('./models');

(async () => {
  await createTables();
})();

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
