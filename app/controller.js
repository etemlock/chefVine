
module.exports.submitSignIn = function(req,res){

	//ensure all parameters are filled and present
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('password','A password is required').notEmpty();


	req.checkBody('username', 'Username cannot contain special characters').isAlphanumeric();
	req.checkBody('password',"password must contain at least one uppercase letter").matches(/[A-z]/,'i');
	req.checkBody('password',"password must contain at least one lowercase letter").matches(/[a-z]/,'i');
	req.checkBody('password',"password must contain at least one number").matches(/[0-9]/,'i');
	req.checkBody('password',"password must contain at least one special character").matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,'i');
	req.checkBody('password', 'password must have at least 8 characters, but no more than 32 characters').isLength({min: 8, max: 32});


	req.sanitize('username').escape();
	req.sanitize('username').trim();

	var errors = req.validationErrors();
	if(errors){
		res.render('signIn',{username: req.body.username, email: req.body.email, password: req.body.password});
		res.send(errors);
	}
}
