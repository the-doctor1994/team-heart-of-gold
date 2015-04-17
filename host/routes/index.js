var express = require('express');
var router = express.Router();

// ## home
// The home page view
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
// Processes information to create a new accoutn
router.post('/process', function(req,res){

});
