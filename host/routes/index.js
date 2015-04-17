var express = require('express');
var router = express.Router();

// require(["dojo/router"], function(router){
//   router.register("/something/:id", function(evt){
//     // Will fire when the hash matches
//     // evt.params.id will contain what is passed in :id
//   });

//   // Startup must be called in order to "activate" the router
//   router.startup();
// });

// # Server Side Routes For Users Not Logged In

// ## home
// The home page view that will allow users to log in or create a new account
router.get('/', function (req, res){

});

// ## login
// The login page for users to sign in
router.get('/login', function (req, res){

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
router.post('/auth', function(req, res){

});

// ## process
// Processes information to create a new account
router.post('/process', function(req,res){

});

module.exports = router;