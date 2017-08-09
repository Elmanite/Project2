const mongoose = require('mongoose');
const Customer = require('./customers.js');
const PlanSchema = new mongoose.Schema({
  planName: String,
  expenses:[
    {expenseAmount: Number,
    expenseCategory: String}
  ],
  expenseTotal: Number
});
const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;
