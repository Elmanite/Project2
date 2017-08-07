const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users.js');
const Plan = require('./models/plans.js');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require ('express-session');
const userController = require ('./controllers/users.js');
const plansController = require ('./controllers/plans.js');
const sessionsController = ('./controllers/session.js');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret:"random string",
  resave:false,
  saveUninitialized:false
}));
app.use('/sessions', sessionsController);
app.use('/users', userController);
app.use('/plans', plansController);
app.get('/', (req, res)=>{
  res.render('index.ejs');
});
mongoose.connect('mongodb://localhost:27017/budgeteer');
mongoose.connection.once('open', ()=>{
  console.log('mongo is connected');
});
app.listen(3001, ()=>{
  console.log('server is listening');
});
