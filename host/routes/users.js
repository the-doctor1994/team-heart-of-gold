var express = require('express');
var router  = express.Router();

var usersdb = require('../lib/users');
var chats = require('../lib/chats');

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

	usersdb.put(user, function(err, dbuser) {
		if (err) {
			req.flash('auth', error);
			res.redirect('/index/login');
		}
		else {
			user.online = false;
		}
	});

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

/*
 * If you pass a user in the req.body, then we will find all users that:
 *	-are in the same school
 *	-is in at least one of the same classes as the passed user
 * 	-has at least one shared interest as the passed user
 */
router.put('/match', function(req, res) {
	if(user === undefined || online[user.id] === undefined) {
		req.flash('auth', 'Not logged in!');
		res.redirect('/index/login');
	}
	var user = {};
	user.username = req.body.username;
	user.password = req.body.password;
	user.school = req.body.school;
	user.courses = req.body.courses;
	user.interests = req.body.interests;

	users.query({school: user.school}, function(error, results) {
		var realMatches = [];
		//For each user at the same school
		results.forEach(function(pMatch, index){
			var inSameClass = false;
			//For each course that this pMatch is enrolled in
			for(var i = 0; i < pMatch.courses.length; i++) {
				//If the pMatch user shares at least one course, keep this pMatch
				if(user.courses.indexOf(pMatch.courses[i]) !== -1) {
					inSameClass = true;
					break;
				}
			}
			//If this pMatch is in at least one of the same courses as our user
			if(inSameClass){
				//For each interest that this pMatch has, if out user shares one, then pMatch is a real match
				for(var j = 0; j < pMatch.interests.length; j++) {
					if(user.interests.indexOf(pMatch.interests[j]) !== -1) {
						realMatches.push(pMatch);
					}
				}
			}
		});
		//TODO: send the realMatches array back to the client
	});
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
		usersdb.query({username: username, password: password, online: true}, function(error, user) {
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
		// This should actually be a db query.
		usersdb.query({username: username, password: password}, function(error, user) {
			if (error) {
				// If there is an error we "flash" a message to the
				// redirected route `/user/login`.
				req.flash('auth', error);
				res.redirect('/index/login');
			}
			else {
				user.online = true;
				usersdb.put(user, function(user){
					req.session.user = user;
					// Redirect to main.
					res.redirect('/index/login');
				});
			}
		});
	}
});


/** 
 * ======USERS======
 *
 * ROUTES FOR THE RESTful DB SERVICE
 */
 router.route('/users')
 	/*
 	 * Route which handles adding a new user to the users DB
 	 * 		- JsonRest.add(object, options)
 	 */
 	.post(function(req, res) {
 		var user = {};
 		user.username = req.body.username;
 		user.password = req.body.password;
 		// TODO: any other parts of the user's object that we know

 		usersdb.add(user, function(error, newUser) {
 			if(error) { res.send(error); }
 			//do any callback stuff here.
 		});
 	});
<<<<<<< HEAD

 	/*
 	 * Route which handles a generic query to the users DB
 	 * 	-req.query is an object which contains all of the query params in an object
 	 *	-Express is parsing anything after a '?' in a route into this object
 	 */
 	.get(function(req, res) {
		users.query(req.query, function(error, results) {
			if(error) { res.send(error); }
			//TODO: do any callback stuff here
		}) 		
 	});
 };


 router.route('/users/:username') {
=======

 router.route('/users/:username')
>>>>>>> aeda3bf4b3c936165ab99c49524f37c413dc0ce3
 	/*
 	 * Route which handles finding one specific User with username = :username
 	 * 		- JsonRest.get(id)
 	 */
 	 .get(function(req, res) {
 	 	usersdb.get(req.params.username, function(error, user) {
 	 		if(error) { res.send(error); }
 	 		//TODO: do any callback stuff here
 	 	});
 	 })

 	 /*
 	  * Route which handles updating one specific user with username = :username
 	  *		- JsonRest.put(object, options)
 	  */
 	 .put(function(req, res) {
 	 	var updatedUser = {};
 	 	updatedUser.username = req.body.username;
 	 	updatedUser.password = req.body.password;
 	 	//TODO: any other parts of the user's object that we know
 	 	usersdb.put(updatedUser, function(error) {
 	 		if(error) { res.send(error); }
 	 		//TODO: do any callback stuff here
 	 	});
 	 })

 	 /*
 	  * Route which handles removing one specific user with username = :username
 	  *		- JsonRest.remove(id)
 	  * Outputs:
 	  *		-it is expected that a 404 is produced if delete could not complete
	  *		-it is expected that a 204 is produced if delete is completed sucessfully
      */
      .delete(function(req, res) {
      	usersdb.remove(req.params.username, function(error) {
      		if(error) { res.send(err); }
      		//TODO: do any callback stuff here
      	});
      });

 /** 
 * ======CHATS======
 *
 * ROUTES FOR THE RESTful DB SERVICE
 */
 router.route('/chats')
 	/*
 	 * Route which handles adding a new chat to the chats DB
 	 * 		- JsonRest.add(object, options)
 	 */
 	.post(function(req, res) {
 		var chat = {};
 		chat.uid = req.body.uid;
 		chat.hist = req.body.hist;
 		// TODO: any other parts of the chat object that we know

 		chats.add(user, function(error, newChat) {
 			if(error) { res.send(error); }
 			//do any callback stuff here.
 		});
 	});
<<<<<<< HEAD

 	/*
 	 * Route which handles a generic query to the chats DB
 	 * 	-req.query is an object which contains all of the query params in an object
 	 *	-Express is parsing anything after a '?' in a route into this object
 	 */
 	.get(function(req, res) {
		users.query(req.query, function(error, results) {
			if(error) { res.send(error); }
			//TODO: do any callback stuff here
		}) 		
 	});
 };
=======
>>>>>>> aeda3bf4b3c936165ab99c49524f37c413dc0ce3

 router.route('/chats/:uid')
 	/*
 	 * Route which handles finding one specific chat with uid = :uid
 	 * 		- JsonRest.get(id)
 	 */
 	 .get(function(req, res) {
 	 	chats.get(req.params.username, function(error, user) {
 	 		if(error) { res.send(error); }
 	 		//TODO: do any callback stuff here
 	 	});
 	 })

 	 /*
 	  * Route which handles updating one specific chat with uid = :uid
 	  *		- JsonRest.put(object, options)
 	  */
 	 .put(function(req, res) {
 	 	var updatedChat = {};
 	 	updatedChat.uid = req.body.uid;
 	 	updatedChat.hist = req.body.hist;
 	 	//TODO: any other parts of the chat object that we know
 	 	chats.put(updatedChat, function(error) {
 	 		if(error) { res.send(error); }
 	 		//TODO: do any callback stuff here
 	 	});
 	 })

 	 /*
 	  * Route which handles removing one specific chat with uid = :uid
 	  *		- JsonRest.remove(id)
 	  * Outputs:
 	  *		-it is expected that a 404 is produced if delete could not complete
	  *		-it is expected that a 204 is produced if delete is completed sucessfully
      */
      .delete(function(req, res) {
      	chats.remove(req.params.uid, function(error) {
      		if(error) { res.send(err); }
      		//TODO: do any callback stuff here
      	});
      });

