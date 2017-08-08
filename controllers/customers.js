const express = require('express');
const Customer = require('../models/customers.js');
const Plan = require('../models/plans.js');
const router = express.Router();

router.get('/', (req, res)=>{
  console.log(req.session, ' this is req.session in cust route')
	Customer.find({}, (err, foundCustomers)=>{
		res.render('customers/index.ejs', {
			customers: foundCustomers
		});
	})
});

router.post('/', (req, res)=>{
	Customer.create(req.body, (err, createdCustomer)=>{
		res.redirect('/customers');
	});
});

router.get('/new', (req, res)=>{
	res.render('customers/new.ejs');
});

router.get('/:id', (req, res)=>{
	Customer.findById(req.params.id, (err, foundCustomer)=>{
		res.render('customers/show.ejs', {
			customers: foundCustomer
		});
	});
});

router.delete('/:id', (req, res)=>{

	Customer.findByIdAndRemove(req.params.id, (err, foundCustomer)=>{
		const planIds = [];
		for (let i = 0; i < foundCustomer.plans.length; i++) {
			planIds.push(foundCustomer.plans[i]._id);
		}
		Plan.remove(
			{
				_id : {
					$in: planIds
				}
			},
			(err, data)=>{
				res.redirect('/customers');
			}
		);
	});
});

router.get('/:id/edit', (req, res)=>{
	Customer.findById(req.params.id, (err, foundCustomer)=>{
		res.render('customers/edit.ejs', {
			customers: foundCustomer
		});
	});
});

router.put('/:id', (req, res)=>{
	Customer.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/customers');
	});
});

module.exports = router;
