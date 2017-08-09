const express         = require('express');
const app             = express();
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const session         = require ('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
  secret: "this is a random string secret",
  resave: false,
  saveUninitialized: false

}));

const customersController = require ('./controllers/customers.js');
app.use('/customers', customersController);
const plansController = require ('./controllers/plans.js');
app.use('/plans', plansController);
const sessionsController = ('./controllers/session.js');
// app.use('/session', sessionsController);

app.get('/', (req, res)=>{
  res.render('index.ejs');
});
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/budgeteer';
mongoose.connect(mongoUri);
mongoose.connect('mongodb://localhost:27017/budgeteer');
mongoose.connection.once('open', ()=>{
  console.log('mongo is connected');
});
const port = process.env.PORT || 3000;
console.log("----------------------");
console.log('Server running on port: ' + port);
console.log("----------------------------");
app.listen(port, ()=>{
  console.log('server is listening');
});
