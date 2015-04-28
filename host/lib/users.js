var mysql = require('mysql');

var environment_settings = {
	dbConnectionSettings: {
    host: 'localhost',
  	user: 'ourDBuser',
		password: 'ourDBpassword',
	  database: 'ourDBname',
		connectionLimit: 10,
 	 	supportBigNumbers: true
	},
};

environment_settings.connection_pool = mysql.createPool(environment_settings.dbConnectionSettings);

exports.get = function(username, callback) {
  var sql = "SELECT * FROM users WHERE username=";
  sql.concat(username);
  
  pool.getConnection( function(error, connection) {
    if(error) { console.log(error); callback(true); return; }
    
    connection.query(sql, queryValues, function(error, user) {
      connection.release();
      if(error) { console.log(error); callback(true); return; }
      callback(false, user);
    });
  });
};

exports.add = function(newUser, callback) {
  var queryKeys = Object.keys(newUser);
  var queryValues = [];

  var sql = "INSERT INTO users (";
  var sql2 = ") VALUES (";
  queryKeys.forEach( function(key, index, keyArray) {
    if(queryValues.length > 0){
      sql.concat(", ");
      sql2.concat(", ");
    }
    sql.concat(key);
    sql2.concat("?");
  });
  sql.concat(sql2);

  pool.getConnection( function(error, connection) {
    if(error) { console.log(error); callback(error); return; }

    connection.query(sql, queryValues, function(error) {
      connection.release();
      if(error) { console.log(error); callback(error); return; }
      callback(false, newUser);
    });
  });
};

exports.query = function(queryObj, callback) {
  var queryKeys = Object.keys(queryObj);
  var queryValues = [];
  
  var sql = "SELECT * FROM users WHERE";
  queryKeys.forEach( function(key, index, keyArray) {
    sql.concat(" ", key, "=?");
    queryValues[index] = queryObj[key];
  });

	pool.getConnection( function(error, connection) {
		if(error) { console.log(error); callback(true); return; }
		
		connection.query(sql, queryValues, function(error, results) {
			connection.release();
			if(error) { console.log(error); callback(true); return; }
			callback(false, results);
		});
	});
};

exports.put = function(updatedUser, callback) {
  var columnKeys = Object.keys(updatedUser);
  var columnValues = [];
  
  var sql = "UPDATE users SET"
  columnKeys.forEach( function(key, index, keyArray) {
    if(key === "username"){
      uidOfObjectToUpdate = updatedUser[key];
    } else {
      if(queryValues.length > 0) {
        sql.concat(",");
      }
      sql.concat(" ", key, "=?");
      queryValues[index] = updatedUser[key];
    }
  });
  sql.concat(" WHERE username=", uidOfObjectToUpdate);

  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error); callback(true);
      return;
    }
    
    connection.query(sql, queryValues, function(error, numRowsChanged) {
      connection.release();
      if(error) {
        console.log(error); callback(true);
        return;
      }
      callback(false, updatedUser);
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
