var express = require('express');
var path    = require('path');
//var xml = require('xml');

//create router object
var router = express.Router();
var controller = require('../app/controller')

//export router
module.exports = router;

//route app
router.get('/', function(req,res){
	//res.sendFile(path.join(__dirname, '../public/views/index.html'));
	res.render('index');
});

router.get('/about', function(req,res){
	//res.sendFile(path.join(__dirname, '../public/views/about.html'));
	res.render('about');
});

router.get('/signIn', function(req,res){
	res.render('signIn', {error: false});
})

router.post('/signIn',function(req,res){
	controller.submitLogin(req,res);
})

router.get('/signUp', function(req,res){
	//res.sendFile(path.join(__dirname, "../public/views/signUpLogin.html"));
	res.render('signUp', {error: false});
});

router.post('/signUp', function(req,res){
	controller.submitSignUp(req,res)
})

router.get('/userProfile', function(req,res){
	var name = req.query.name
	var memberId = req.query.memberId
	var memberDate = req.query.memberDate
	res.render('userProfile',{name: name, memberId: memberId, memberDate: memberDate})
})


