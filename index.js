const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); // <- have to require the schema before its used in passport.js
require('./services/passport');

// tells mongoose to connect to the mongoDB
// useNewUrlParser is used so mongo doesnt throw a deprecation warning
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
  .catch((err) => console.log('[index.js] Deprication warning connecting to MongoDB (this is ok, its on mongoDB)'));

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({ // <- express doesnt use cookies out the box, this tells it to use cookies
  maxAge: 30 * 24 * 60 * 60 * 1000, // <- let cookie last for 30 days in ms
  keys: [keys.cookieKey] // <- encrypt cookies with custom encryption
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // <- tell app to use these routes
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express Server App is listening on port: \'${PORT}\'`);
});
