const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');
require('./models/User'); // <- have to require the schema before its used in passport.js
require('./services/passport');

// tells mongoose to connect to the mongoDB
// useNewUrlParser is used so mongo doesnt throw a deprecation warning
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
  .catch((err) => console.log('[index.js] Deprication warning connecting to MongoDB (this is ok, its on mongoDB)'));

// create app and tell it to use the routes on authRoutes.js
const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
