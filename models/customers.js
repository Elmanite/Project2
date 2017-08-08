const mongoose = require('mongoose');
const Plan = require('./plans.js');
const CustomerSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 mailingAddress: String,
 city: String,
 State: String,
 plans:[Plan.schema]
});
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
