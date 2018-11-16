const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({
  googleId: String,
  //credits: Number
});

mongoose.model('users', userSchema);
