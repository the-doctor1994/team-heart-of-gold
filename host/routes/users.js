require([
		"dojo/store/Memory",
		"dojo/store/JsonRest",
		"dojo/store/Observable",
		"dojo/store/Cache"
		],
		
	function(Memory, JsonRest, Observable, Cache){
		/* some data */
		var store = new JsonRest({
			target: /* some resource */
		});
		store = new Memory({}); /* some stuff */
});





// var express = require('express');
// var router  = express.Router();

// # User Server-Side Routes

// idk if we actually need all of these yet I'm just following an example

/*
var userMemoryStore = new dojo.store.Memory();
var userJsonRestStore = new dojo.store.JsonRest({});
var userStore = new dojo.store.Cache(userJsonRestStore, userMemoryStore);
var userDataStore = new dojox.data.JsonRestStore({
	target: "something",
	idAttribute: "something"
});

require([
		"dojo/router",
		"dojo/dom",
		"dojo/on",
		"dojo/request",
		"dojo/json",
		"dojo/domReady!",
		"dojo/query",
		"dojo/store/JsonRest",
		"dojo/store/Memory"],
		
		function(
			router,
			dom,
			on,
			request,
			json,
			domReady!,
			query,
			JsonRest) {

			var store = new JsonRest({
				target: ""
			});

			
});
*/

/*
// ## home
// The main user view which will contain notifications and links to other views.
router.get('/home', function(req, res) {
	// grab user from the request's session
	var user = req.session.user;

	// 
	if (user !== undefined) {

	}
});

// ## logout
// Deletes the user's session and redirects to login.
router.get('/logout', function(req, res) {

});

// ## edit
// Allows the user to edit the information in their profile, or delete their
// profile altogether.
router.get('/edit', function(req, res) {

});

// ## match
// Renders the view containing all of the user's current matches generated by
// the matching algorithm.
router.get('/match', function(req, res) {

});

// ## chat
// Renders the chat view which allows the user to chat with users who they have
// matched with.
router.get('/chat', function(req, res) {

});

module.exports = router;
*/
