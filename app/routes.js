var express = require('express');
var path    = require('path');

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
	//res.sendFile(path.join(__dirname, "../public/views/signUpLogin.html"));
	res.render('signIn');
});


router.post('/signIn', function(req,res){
	var userName = req.body.username
	var email = req.body.email
	var password = req.body.password

	controller.submitSignIn(req,res)
})
