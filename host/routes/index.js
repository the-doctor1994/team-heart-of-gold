var express = require('express');
var router = express.Router();
var usersdb = require('../lib/users');
var usersJS = require('./users');

// ##### Server Side Routes For Users Not Logged In ##########


//##defualt
// in case index by itself is referenced
router.get('/', function(req, res){
	res.redirect('/index/login');
}); 


// ## login
// The login page for users to sign in
router.get('/login', function(req, res){
	var user  = req.session.user;
	// If the user is already logged in - we redirect to the
	// main application view. We must check that the database has the user marked as online. The reason is that
	// the cookie may still be stored on the client even if the
	// server has been restarted.
	if (user !== undefined){
	 console.log('this is the stale user' + JSON.stringify(user));
	 //Check DB to see if user is already online
	 usersdb.query({username: user.username, online: 1}, function(error, results){
	 	console.log(JSON.stringify(results));
		 if(error){
	 		// If there is an error we "flash" a message to the
			// redirected route `/index/login`.
	 		req.flash('auth', error);
	 		res.redirect('/index/login');
	 	}
	 	else if (results.length === 0){
			// User is not online, redirect to login page
			// Render the login view if this is a new login.
			 req.session.destroy();
			 res.render('login');
		}
		else{
			// User is online, redirect to home
			res.redirect('../users/home');
		}
	 });
	}
	else {
		console.log('user not logged in');
		// User is not online, redirect to login page
	 	// Render the login view if this is a new login.
		res.render('login');
	}
});

// ## new
// The page to make a new StuddyBuddy account
router.get('/new', function(req, res){
	var user  = req.session.user;

	// If the user is already logged in - we redirect to the
	// main application view. We must check that the database has the user marked as online. The reason is that
	// the cookie may still be stored on the client even if the
	// server has been restarted.
	if (user !== undefined){
	 //Check DB to see if user is already online
		usersdb.query({username: user.username, online:1}, function(error, results){
	 	if(error){
	 		// If there is an error we "flash" a message to the
			// redirected route `/index/login`.
	 		req.flash('auth', error);
	 		res.redirect('/index/login');
	 	}
	 	else if (results.length === 0){
			req.session.destroy();
			// User is not online, redirect to adduser page
			// Render the new user view to create new user.
			res.render('adduser');
		}
		else{
			// User is online, redirect to home
			res.redirect('../users/home');
		}
	 });
	}
	else {
		// User is not online, redirect to login page
	 	// Render the new user view to create new user
		res.render('adduser');
	}
});


// ## auth
// Performs basic user authentication for login
router.post('/auth', function(req, res) {
	// redirect if logged in:
	var user = req.session.user;

	// do the check as described in the `exports.login` function.
	if (user !== undefined){
	 //Check DB to see if user is already online
	 usersdb.query({username: user.username, online: 1}, function(error, results){
	 	if(error){
	 		// If there is an error we "flash" a message to the
			// redirected route `/index/login`.
	 		req.flash('auth', error);
	 		res.redirect('/index/login');
	 	}
	 	else{
	 		if (results.length === 0){
	 			// User is not online, redirect to login page
	 			console.log('lying user object fields: ' + JSON.stringify(user));
	 			console.log('no users found!!!!!!');
				req.session.destroy();
	 			res.redirect('/index/login');
	 		}
	 		else{
	 			// User is online, redirect to home
	 			console.log('user already online, redirect to home');
				res.redirect('../users/home');
	 		}
	 	}
	 });
	}
	else {
		// Pull the values from the form.
		var username = req.body.username;
		var password = req.body.password;
		// Perform the user lookup.
		usersdb.query({username: username, password: password}, function(error, results) {
			if (error) {
				// If there is an error we "flash" a message to the
				// redirected route `/user/login`
				req.flash('auth', error);
				res.redirect('/index/login');
			}
			else if(results.length > 0){
				var user = results[0];
				//check if the user is already marked online
				if(user.online === 1){
					console.log("user was not logged out correctly last session");
					req.session.user = user;
					req.session.save();
					console.log("USER OBJ SAVED TO SESSION" + JSON.stringify(user));
					// Redirect to home.
					res.redirect('../users/home');
				}
				else{
					//set the user to online
					user.online = true;
					usersdb.put(user,function(error,message){
						if(error){
							// If there is an error we "flash" a message to the
							// redirected route `/user/login`
							req.flash('auth',error);
							res.redirect('/index/login');
						}
						else{
							console.log(message);
							req.session.user = user;
							req.session.save();
							console.log("USER OBJ SAVED TO SESSION" + JSON.stringify(user));
							// Redirect to home.
							res.redirect('../users/home');
						}
					});
				}
			} else { // user was not found
				console.log("User was not found");
				res.redirect("/index/login");
			}
		});
	}
});

// ## process
// Processes information to create a new account 
router.post('/process', function(req,res){
	var newUser = req.body;
	usersdb.get(newUser.username, function(error, user){
		if(user === undefined){
			// If user is an empty array, user does not exist
			// adds user to db
			usersdb.add(newUser, function(error, newUser) {
				if (error) {
					console.log(error);
					res.send(error);
				}
				else {
					newUser.online = true;
					usersdb.put(newUser,function(){ //we'll just assume it works
						req.session.user = newUser;
						req.session.save();
						console.log("OBJECT SAVED " + req.session.user.username);
						res.redirect('../users/home');
					});
				}
			});
		}
		else{
			// User already exists in db, flashes error
			// and redirects to make new user page
			req.flash('auth', 'user already exists');
			res.redirect('/index/login');
		}
	});

});

module.exports = router;
