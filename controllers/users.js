const express = require('express');
const User = require('../models/users.js');
const Plan = require('../models/plans.js');
const router = express.Router();

router.get('/', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
    res.render('users/index.ejs',{
      users:foundUsers
    });
  });
});
router.get('/new', (req, res)=>{
  res.render('users/new.ejs');
});
router.get('/:id', (req,res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/show.ejs',{
      users:foundUser
    });
  });
});
router.get('/:id/edit', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/edit.ejs',{
      users:foundUser
    });
  });
});
router.post('/', (req, res)=>{
  User.create(req.body, (err, createdUser)=>{
    res.redirect('/users');
  });
});
router.put('/:id', (req, res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/users');
  });
});
router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
    const planIds = [];
    for(let i=0; i< foundUser.plan.length; i++){
      planIds.push(foundUser.plan[i]._id);
    }
    Plan.remove(
      {
        _id:{
          $in:planIds
        }
      },
      (err, data)=>{
        res.redirect('/users');
      }
    );
  });
});
module.exports = router;
