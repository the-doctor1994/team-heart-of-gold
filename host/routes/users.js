var express = require('express');
var router  = express.Router();
var db = require('../lib/db');

// ############# User Server-Side Routes ###########

// ## home
// The main user view which will contain notifications and links to other views.
router.get('/home', function(req, res) {
	var message = req.flash('auth') || 'Login Successful';
	// added session support
	var user = req.session.user;
	if (user === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/index/login');
	}
});

// ## logout
// Deletes user info & session - then redirects to login.
router.get('/logout', function(req, res) {
	var user = req.session.user;
	if (user === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/index/login');
	}

	delete req.session.user;
	res.redirect('/index/login');
});

// ## edit
// Allows the user to edit the information in their profile, or delete their
// profile altogether.
router.get('/edit', function(req, res) {
	if (user === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/index/login');
	}
});

// ## match
// Renders the view containing all of the user's current matches generated by
// the matching algorithm.
router.get('/match', function(req, res) {
	if (user === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/index/login');
	}
});

// ## chat
// Renders the chat view which allows the user to chat with users who they have
// matched with.
router.get('/chat', function(req, res) {
	if (user === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/index/login');
	}
});

// ## auth
// Performs **basic** user authentication. ##### might not need #####
// We need to change this to interact with a real database.
router.post('/auth', function(req, res) {
	// redirect if logged in:
	var user = req.session.user;

	// do the check as described in the `exports.login` function.
	if (user !== undefined) {
		db.query({username: username, password: password, online: true}, function(error, user) {
			if (error) {
				req.flash('auth', error);
				res.redirect('/index/login');
			}
			else {
				if (user.length > 1) {
					// uh oh
				}
				else if (user.length === 0) {
					res.redirect('/index/login');
				}
				else {
					req.session.user = user[0];
					res.redirect('/user/home');
				}
			}
		});
	}
	else {
		// Pull the values from the form.
		var username = req.body.username;
		var password = req.body.password;
		// Perform the user lookup.
		db.query({username: username, password: password}, function(error, user) {
			if (error) {
				// If there is an error we "flash" a message to the
				// redirected route `/user/login`.
				req.flash('auth', error);
				res.redirect('/index/login');
			}
			else {
				user.online = true;
				db.put(user, function(user){
					req.session.user = user;
					// Redirect to main.
					res.redirect('/index/login');
				});
			}
		});
	}
});

