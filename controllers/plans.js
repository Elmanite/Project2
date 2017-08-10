const express = require('express');
const router = express.Router();
const Plan = require('../models/plans.js');
const Customer = require('../models/customers.js');

router.get('/', (req, res)=>{
  // if(req.session.logged){
    Plan.find({}, (err, foundPlans)=>{
      res.render('plans/index.ejs', {
        plans: foundPlans
      });//closer render
    });//close find
  // }else{
  //   res.redirect('/sessions/login');
  // }
});//close router get
router.get('/new', (req, res)=>{
  Customer.find({}, (err, allCustomers)=>{
    res.render('plans/new.ejs',{
      customers:allCustomers
    });//close render
  });//close customer find
});//close router get
router.post('/', (req, res)=>{
  console.log('Creating a new financial plan -----------------------------------------');
  Customer.findById(req.body.customerId, (err, foundCustomer)=>{
    Plan.create(req.body, (err, createdPlan)=>{
      createdPlan.expenses.push({expenseCategory1:req.body['expenses.expenseCategory1'], expenseAmount1:req.body['expenses.expenseAmount1'],expenseCategory2:req.body['expenses.expenseCategory2'],expenseAmount2:req.body['expenses.expenseAmount2']});
      createdPlan.save((err, data)=>{
        foundCustomer.plans.push(createdPlan);
        foundCustomer.save((err, data)=>{
          res.redirect('/plans');
        });
      });
    });
  });
});
router.get('/:id', (req, res)=>{
  Plan.findById(req.params.id, (err, foundPlan)=>{
    Customer.findOne({'plans._id': req.params.id},
    (err, foundCustomer)=>{
      res.render('plans/show.ejs',{
        customers:foundCustomer,
        plans:foundPlan
      });
    });
  });
});
router.delete('/:id', (req, res)=>{
  Plan.findByIdAndRemove(req.params.id, (err, foundPlan)=>{
    Customer.findOne({'plans._id':req.params.id}, (err, foundCustomer)=>{
      foundCustomer.plans.id(req.params.id).remove();
      foundCustomer.save((err, data)=>{
        res.redirect('/plans');
      });
    });
  });
});
router.get('/:id/edit', (req, res)=>{
  Plan.findById(req.params.id, (err, foundPlan)=>{
    Customer.find({}, (err, allCustomers)=>{
      Customer.findOne({'plans._id': req.params.id}, (err, foundPlanCustomer)=>{
        res.render('plans/edit.ejs',{
          plans:foundPlan,
          customers: allCustomers,
          planCustomer: foundPlanCustomer
        });
      });
    });
  });
});

router.put('/:id', (req, res)=>{
  Plan.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, updatedPlan)=>{
    console.log('this is the updated plan--------------------------------', updatedPlan);
    Customer.findOne({'plans._id':req.params.id},
    (err, foundCustomer)=>{
      if(foundCustomer._id.toString() !== req.body.customerId){
        foundCustomer.plans.id(req.params.id).remove();
        foundCustomer.save((err, savedFoundCustomer)=>{
          Customer.findById(req.body.customerId, (err, newCustomer)=>{
            newCustomer.plans.expenses.push({expenseCategory1:req.body['expenses.expenseCategory1'], expenseAmount1:req.body['expenses.expenseAmount1'],expenseCategory2:req.body['expenses.expenseCategory2'],expenseAmount2:req.body['expenses.expenseAmount2']});
            newCustomer.save((err, savedNewCustomer)=>{
              res.redirect('/plans/'+req.params.id);
            });
          });
        });
      }else{
        foundCustomer.plans.id(req.params.id).remove();
        foundCustomer.plans.expenses.push(updatedPlan);
        foundCustomer.save((err, data)=>{
          res.redirect('/plans/'+req.params.id);
        });
      }
    });
  });
});

module.exports = router;
