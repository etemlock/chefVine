var User = require('./models/users.js');


function generateRandAlphaNumId(len){
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i <= len; i++){
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}

module.exports.submitSignUp = function(req,res){

	//ensure all parameters are filled and present
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('password','A password is required').notEmpty();
    var emptyErrors = req.validationErrors()

    //determine which fields are empty and reload signUp with previously inputed variables.
    if(emptyErrors){
    	var msgList = {}
    	for (var e in emptyErrors){
    		var param = emptyErrors[e].param
    		var msg = emptyErrors[e].msg
    		msgList[param] = msg
    	}
    	res.render('signUp',{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			error: msgList});
        return
    }

    //ensure all parameters are valid and fit prerequisites
	req.checkBody('name', 'Name cannot contain special characters').isAlphanumeric();
	req.checkBody('email',"Email is not of valid format").matches(/[A-Z0-9a-z._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/,'i');
	req.checkBody('password',"password must contain at least one special character").matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,'i');
	req.checkBody('password',"password must contain at least one number").matches(/[0-9]/,'i');
	req.checkBody('password',"password must contain at least one lowercase letter").matches(/[a-z]/,'i');
	req.checkBody('password',"password must contain at least one uppercase letter").matches(/[A-z]/,'i');
	req.checkBody('password', 'password must have at least 8 characters, but no more than 32 characters').isLength({min: 8, max: 32});

	req.sanitize('name').escape();
	req.sanitize('name').trim();
	var errors = req.validationErrors();

    //determine which fields don't fit prerequisites and reload signUp with previously inputed variables.
	if(errors){
		var msgList = {}
    	for (var e in errors){
    		var param = errors[e].param
    		var msg = errors[e].msg
    		msgList[param] = msg
    	}
		res.render('signUp',{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			error: msgList});
	} else {
        User.findOne({"email": req.body.email}, function(err, user){
            if(user){
                console.log(req.body.email);
                res.send("Email is already taken");
                return;
            }
        });

		var newUser = new User({
        	name: req.body.name,
            memberId: generateRandAlphaNumId(9),
            email: req.body.email, 
        	admin: false,
        	password: req.body.password,
        	time_created: new Date()
        });
        newUser.save( function(err){
             if (err) throw err;

             console.log('succesfully saved user: ' + newUser);
        });
        res.json(newUser);
		res.send("Welcome " + req.body.name + "!");
	}
}

module.exports.submitLogin = function(req,res){
    req.checkBody('email','Email is required').notEmpty();
	req.checkBody('password','A password is required').notEmpty();
	var errors = req.validationErrors()
	var msgList = {}
    if(errors){
    	for (var e in errors){
    		var param = errors[e].param
    		var msg = errors[e].msg
    		msgList[param] = msg
    	}
    	res.render('signIn',{
			email: req.body.email,
			password: req.body.password,
			error: msgList});
    } else {
    	User.findOne({"email": req.body.email, "password": req.body.password}, function(err,user){
    		if (err) throw err;

    		if (user){
    			//console.log(user)
                const url = require("url");
                var userCreateDate = user.time_created.toISOString().slice(0,10);
                res.redirect(url.format({
                    pathname: '/userProfile',
                    query: {
                        "name" : user.name,
                        "memberId" : user.memberId,
                        "memberDate" : userCreateDate
                    }
                }));
    		} else {
    			msgList["match"] = "password or email is incorrect. Please try again"
    			res.render('signIn',{
    				email: req.body.email,
    				password: req.body.password,
    				error: msgList
    			})
    		}
    	})
    }
}

module.exports.loadUserProfile = function(req,res){
    res.render('userProfile', {
        name: req.body.name,
        memberId: req.body.memberId,
        memberDate: req.body.memberDate
    })
}
