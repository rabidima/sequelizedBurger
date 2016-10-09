/*
Routing and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burgerC = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burgerC.all(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burgerC.create(['burger_name', 'devouted'], [req.body.burger_name, req.body.devouted], function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burgerC.update({ devouted: req.body.devouted }, condition, function () {
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	burgerC.delete(condition, function () {
		res.redirect('/burgers');
	});
});

module.exports = router;
