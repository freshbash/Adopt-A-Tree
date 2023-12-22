//Load invironment variables in development mode
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const app = require('./app')
const createTables = require('./models');

(async () => {
  await createTables();
})();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
