var mysql = require('mysql');

var environment_settings = {
	dbConnectionSettings: {
    host: 'localhost',
  	user: 'root',
		password: '',
	  database: 'chats',
		connectionLimit: 10,
 	 	supportBigNumbers: true
	},
};

environment_settings.connection_pool = mysql.createPool(environment_settings.dbConnectionSettings);

exports.get = function(uid, callback) {
  var sql = "SELECT * FROM chat WHERE uid=";
  sql.concat(uid);
  
  pool.getConnection( function(error, connection) {
    if(error) { console.log(error); callback(true); return; }
    
    connection.query(sql, queryValues, function(error, user) {
      connection.release();
      if(error) { console.log(error); callback(true); return; }
      callback(false, user);
    });
  });
};
/**
 * This needs to be updated to add a convo object, not a user object
 **/
/*
exports.add = function(newUser, callback) {
  var queryKeys = Object.keys(newUser);
  var queryValues = [];

  var sql = "INSERT INTO chats (";
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
*/

exports.query = function(queryObj, callback) {
  var queryKeys = Object.keys(queryObj);
  var queryValues = [];
  
  var sql = "SELECT * FROM chats WHERE";
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

exports.put = function(updatedConvo, callback) {
  var columnKeys = Object.keys(updatedConvo);
  var columnValues = [];
  
  var sql = "UPDATE users SET"
  columnKeys.forEach( function(key, index, keyArray) {
    if(key === "uid"){
      uidOfObjectToUpdate = updatedConvo[key];
    } else {
      if(queryValues.length > 0) {
        sql.concat(",");
      }
      sql.concat(" ", key, "=?");
      queryValues[index] = updatedConvo[key];
    }
  });
  sql.concat(" WHERE uid=", uidOfObjectToUpdate);

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
      callback(false, updatedConvo);
    });
  });
};

exports.delete = function(uid, callback){
  var sql = "DELETE FROM chats WHERE uid = " + uid;
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
