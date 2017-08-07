const mongoose = require('mongoose');
const Plan = require('./plans.js');
const UserSchema = new mongoose.Schema({
 username: String,
 password: String,
 firstName: String,
 lastName: String,
 mailingAddress: String,
 city: String,
 State: String,
 plan:[Plan.schema]
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
