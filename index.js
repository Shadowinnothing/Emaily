const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); // <- have to require the schema before its used in passport.js
require('./models/Survey');
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
require('./routes/surveyRoutes')(app);

// makes sure express routes works right in production
if(process.env.NODE_ENV === 'production'){
  // express will serve up production assets like main.js and main.css
  app.use(express.static('client/build'));

  // express will serve up html file if route is unrecognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express Server App is listening on port: \'${PORT}\'`);
});
