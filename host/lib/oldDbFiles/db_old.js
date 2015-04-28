var mysql = require('node-mysql');

var environment_settings = {
	dbConnectionSettings: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'users',
      connectionLimit: 10,
      supportBigNumbers: true
	}
};

environment_settings.connection_pool = mysql.createPool(environment_settings.dbConnectionSettings);

exports.get = function(username, callback) {
  var sql = "SELECT * FROM users WHERE username=";
  sql.concat(username);
  
  pool.getConnection( function(error, connection) {
    if(error) { console.log(error); callback(error);
      return;
    }
    
    connection.query(sql, queryValuePairs, function(error, user) {
      connection.release();
      if(error) { console.log(error); callback(error);
        return;
      }
      callback('', user);
    });
  });
};

//to add a new user to the users database
exports.add = function(newUser, callback) {
  var queryKeys = Object.getOwnPropertyNames(newUser);

  var sql = "INSERT INTO users (";
  var sql2 = ") VALUES (";
  queryKeys.forEach( function(key, index, keyArray) {
    if(index > 0){
      sql.concat(", ");
      sql2.concat(", ");
    }
    sql.concat(key);
    sql2.concat("?");
  });
  sql.concat(sql2);

  pool.getConnection( function(error, connection) {
    if(error) { console.log(error); callback(error); return; }

    connection.query(sql, function(error) {
      connection.release();
      if(error) { console.log(error); callback(error); return; }
      callback('', newUser);
    });
  });
};

//returns all entries that match any set of key pairs
exports.query = function(queryObj, callback) {
  var queryKeys = Object.getOwnPropertyNames(queryObj);
  
  var sql = "SELECT * FROM users WHERE";
  queryKeys.forEach( function(key) {
    sql.concat(" ", key, " = ", queryObj[key]);
  });

  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql,function(error,results){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          callback('',results);
        }
      });
    }
  });
};

//to modify EXISTING entries in the users table for one user only
exports.put = function(updatedUser, callback) {
  var userKeys = Object.getOwnPropertyNames(updatedUser);
  var sql = "UPDATE users SET";
  var uidOfObjectToUpdate = '';
  userKeys.forEach( function(key, index) {
    if(key === "username"){
      uidOfObjectToUpdate = updatedUser[key];
    }
    else {
      if(index > 1) {
        sql.concat(" ,");
      }
      sql.concat(" ", key, " = ", updatedUser[key]);
    }
  });
  if(uidOfObjectToUpdate === ''){
    callback('no valid username entered');
  }
  else{
    sql.concat(" WHERE username = ",uidOfObjectToUpdate);
    pool.getConnection(function(error,connection){

      if(error){
        console.log(error);
        callback(error);
      }

      else{
        connection.query(sql,function(error){
          connection.release();
          if(error){
            console.log(error);
            callback(error);
          }
          else{
            callback('',updatedUser);
          }
        });
      }
    });
  }
};

//to delete ONE user from the table
exports.delete = function(username, callback){
  var sql = "DELETE FROM users WHERE username = " + username;
  pool.getConnection( function(error, connection) {
    if(error) { console.log(error);
      callback(error);
    }
    else{
      connection.query(sql,function(error){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          callback('', username);
        }
      });
    }
  });
};
