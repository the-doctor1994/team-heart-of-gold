var mysql = require('node-mysql');

var environment_settings = {
	dbConnectionSettings: {
    host: 'mysql3.000webhost.com',
  	user: 'a9606264_root',
		password: 'squiddy18',
	  database: 'a9606264_users',
		connectionLimit: 10,
 	 	supportBigNumbers: true
	}
};

environment_settings.connection_pool = mysql.createPool(environment_settings.dbConnectionSettings);

exports.query = function(queryObj, callback) {
  var queryProperties = queryObj.getKeys();
  var sql = "SELECT * FROM users WHERE";
  var queryValues = [];
  var i = 0;
  queryProperties.forEach( function(index, property) {
    sql += " " + property.toString() + "=?";
    queryValues[i] = queryProperties[property];
  });
	//var sql = "SELECT * FROM users WHERE username=?";

	pool.getConnection( function(error, connection) {
		if(error) { console.log(error); callback(true); return; }
		
		connection.query(sql, queryValues, function(error, results) {
			connection.release();
			if(error) { console.log(error); callback(true); return; }
			callback(false, results);
		});
	});
};

exports.delete = function(username, callback){
  var sql = "DELETE FROM users WHERE username = " + username;
  pool.getConnection( function(error, connection) {
    if(error) { console.log(error); callback(error);
      return;
    }
    connection.query(sql, function(error) {
      connection.release();
      if(error) { console.log(error);}
      callback(error);
    });
  });
};

/*
// # User Library
//****************************************************************************
//**********THIS IS JUST A TEMPLATE. DO NOT KEEP THIS CODE***************
//****************************************************************************
// ## User Objects
function User(username, password, uid, priv) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
  this.priviledge = 'user';
  if(priv === 'admin'){this.priviledge = 'admin';}
  this.isAdmin = (this.priviledge === "admin");
}

//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

exports.add = function(name, pass, admin, cb){
  var notexists = this.lookup(name, pass, function(err, user){
    if(err === 'user not found'){
      return true;
    }
    else{
      return false;
    }
  });
  if(notexists){
    var uid = userdb.length + 1;
    userdb.push(new User(name,pass,uid,admin));
    //debugging
    console.log(userdb[uid]);
    cb(userdb[uid]);
  }
  else{
    cb(undefined);
  }
};

./
