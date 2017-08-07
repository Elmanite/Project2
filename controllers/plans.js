const express = require('express');
const router = express.Router();
const Plan = require('../models/plans.js');
const User = require('../models/users.js');

router.get('/', (req, res)=>{
  if(req.session.logged){
    Plan.find({}, (err, foundPlans)=>{
      res.render('plans/index.ejs', {
        plans: foundPlans
      });//closer render
    });//close find
  }else{
    res.redirect('/sessions/login');
  }
});//close router get
router.get('/new', (req, res)=>{
  User.find({}, (err, allUsers)=>{
    res.render('plans/new.ejs',{
      users:allUsers
    });//close render
  });//close user find
});//close router get
router.get('/:id', (req, res)=>{
  Plan.findById(req.params.id, (err, foundPlan)=>{
    User.findOne({'plan._id': req.params.id},
    (err, foundUser)=>{
      res.render('/plans/show.ejs',{
        users:foundUser,
        plans:foundPlan
      });
    });
  });
});
router.get('/:id/edit', (req, res)=>{
  Plan.findById(req.params.id, (err, foundPlan)=>{
    User.find({}, (err, allUsers)=>{
      User.findOne({'plan._id': req.params.id}, (err, foundPlanUser)=>{
        res.render('plans/edit.ejs',{
          plas:foundPlan,
          users: allUsers,
          planUser: foundPlanUser
        });
      });
    });
  });
});
router.post('/', (req, res)=>{
  User.findById(req.body.userId, (err, foundUser)=>{
    Plan.create(req.body, (err, createdPlan)=>{
      foundUser.plan.push(createdPlan);
      foundUser.save((err, data)=>{
        res.redirect('/plans');
      });
    });
  });
});
router.put('/:id', (req, res)=>{
  Plan.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, updatedPlan)=>{
    User.findOne({'plan._id':req.params.id},
    (err, foundUser)=>{
      if(founduser._id.toString() !== req.body.userId){
        foundUser.plan.id(req.params.id).remove();
        foundUser.save((err, savedFoundUser)=>{
          User.findById(req.body.userId, (err, newUser)=>{
            newUser.plan.push(updatedPlan);
            newUser.save((err, savedNewUser)=>{
              res.redirect('/plans/'+req.params.id);
            });
          });
        });
      }else{
        foundUser.plan.id(req.params.id).remove();
        foundUser.plan.push(updatedPlan);
        foundUser.save((err, data)=>{
          res.redirect('/plans/'+req.params.id);
        });
      }
    });
  });
});
router.delete('/:id', (req, res)=>{
  Plan.findByIdAndRemove(req.params.id, (err, foundPlan)=>{
    User.findOne({'plan._id':req.params.id}, (err, foundUser)=>{
      foundUser.plan.id(req.params.id).remove();
      foundUser.save((err, data)=>{
        res.redirect('/plans');
      });
    });
  });
});
