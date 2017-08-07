const mongoose = require('mongoose');
const User = require('./users.js');
const PlanSchema = new mongoose.Schema({
  planName: String,
  expenses:[
    {expenseName:String},
    {expenseAmount: Number},
    {expenseCategory: String}
  ],
  expenseTotal: Number
});
const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;
