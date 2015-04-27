var express = require('express');
var router = express.Router();

/*require(["dojo/router"], function(router){
  router.register("/something/:id", function(evt){
    // Will fire when the hash matches
    // evt.params.id will contain what is passed in :id
  });
*/

//   // Startup must be called in order to "activate" the router
//   router.startup();
// });

// ##### Server Side Routes For Users Not Logged In ##########

// ## home
// The home page view that will allow users to log in or create a new account
router.get('/home', function(req, res) {
	var message = req.flash('auth') || 'Login Successful';
	// added session support
	var user = req.session.user;
	if (user === undefined || online[user.uid] === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/user/login');
	}
	else {
		res.render('main', { title   : 'User Main',
			message : message,
			username : user.username,
			password : user.password });
	}
});

// ## login
// The login page for users to sign in
router.get('/login', function(req, res){
	// Grab any messages being sent to use from redirect.
	var authmessage = req.flash('auth') || '';

	// TDR: redirect if logged in:
	var user  = req.session.user;

	// TDR: If the user is already logged in - we redirect to the
	// main application view. We must check both that the `userid`
	// and the `online[userid]` are undefined. The reason is that
	// the cookie may still be stored on the client even if the
	// server has been restarted.
	if (user !== undefined && online[user.uid] !== undefined) {
		res.redirect('/user/main');
	}
	else {
		// Render the login view if this is a new login.
		res.render('login', { title   : 'User Login',
			message : authmessage });
	}
});

// ## new
// The page to make a new StuddyBuddy account
router.get('/new', function(req, res){

});

// ## forgot-password
// The page to recover a lost password
router.get('/forgot-password', function(req,res){

});

// ## auth
// Performs basic user authentication
router.post('/auth', function(req, res) {
	// redirect if logged in:
	var user = req.session.user;

	// do the check as described in the `exports.login` function.
	if (user !== undefined && online[user.uid] !== undefined) {
		res.redirect('/user/main');
	}
	else {
		// Pull the values from the form.
		var username = req.body.username;
		var password = req.body.password;
		// Perform the user lookup.
		userlib.lookup(username, password, function(error, user) {
			if (error) {
				// If there is an error we "flash" a message to the
				// redirected route `/user/login`.
				req.flash('auth', error);
				res.redirect('/user/login');
			}
			else {
				req.session.user = user;
				// Store the user in our in memory database.
				online[user.uid] = user;
				// Redirect to main.
				res.redirect('/user/main');
			}
		});
	}
});

// ## process
// Processes information to create a new account  ##### might not need #####
router.post('/process', function(req,res){

});

module.exports = router;