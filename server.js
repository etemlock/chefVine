var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var app = express();
var port = 9090;


//set express layouts
app.set('view engine','ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

mongoose.connect('mongodb://localhost/test');



//delgate routes.js as the app's router
var router = require('./app/routes.js');
app.use('/',router);

//upon loading it will look by default the chefVine folder
app.use(express.static(__dirname));

//start server
app.listen(port, function(){
	console.log('app started');
});



