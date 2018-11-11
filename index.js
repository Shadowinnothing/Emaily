const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');
require('./services/passport');

// tells mongoose to connect to the mongoDB
mongoose.connect(keys.mongoURI)
  .then(() => {})
  .catch((err) => console.log('[index.js] Error connecting to MongoDB'));

// create app and tell it to use the routes on authRoutes.js
const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
