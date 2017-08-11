const mongoose = require('mongoose');
const Customer = require('./customers.js');
const PlanSchema = new mongoose.Schema({
  planName: String,
  expenseAmount1: Number,
  expenseCategory1: String,
  expenseAmount2: Number,
  expenseCategory2: String,
  expenseTotal: Number
});
const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;
