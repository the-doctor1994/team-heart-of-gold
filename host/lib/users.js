var mysql = require('mysql');

var environment_settings = {
	dbConnectionSettings: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'main',
      connectionLimit: 10,
      supportBigNumbers: true
	}
};

var db = environment_settings.dbConnectionSettings.database;
var pool = mysql.createPool(environment_settings.dbConnectionSettings);

//retrieve the user information of one user
exports.get = function(username, callback) {
  var sql = "SELECT FROM ?? WHERE username=?";
  
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, [db, username], function(error, user){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          callback('', user);
        }
      });
    }
  });
};

//to add a new user to the users database
exports.add = function(newUser, callback) {

  var sql = "INSERT INTO ?? SET ?";

  pool.getConnection( function(error, connection) {
    if(error) {
      console.log('this is where the error happens')
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, [db, newUser], function(error){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          callback('',newUser);
        }
      });
    }
  });
};

//returns all entries that match any set of key pairs
exports.query = function(queryObj, callback) {
  var queryKeys = Object.keys(queryObj);
  
  var sql = "SELECT * FROM ?? WHERE";
  queryKeys.forEach( function(key, index, array) {
    if(index > 0){
      sql.concat(" AND ");
    }
    sql.concat(" ", key, "='", queryObj[key], "'");
  });

  pool.getConnection(function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, db, function(error,results){
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
  //var userKeys = Object.keys(updatedUser);

  var sql = "UPDATE ?? SET ?? WHERE username=?";

  var uidOfObjectToUpdate = updatedUser['username'];
  if(!uidOfObjectToUpdate){
    callback('no username entered');
  }
  else{
    pool.getConnection(function(error,connection){
      if(error){
        console.log(error);
        callback(error);
      }
      else{
        connection.query(sql, [db, updatedUser, uidOfObjectToUpdate], function(error){
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
  var sql = "DELETE FROM ?? WHERE username=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, [db, username], function(error){
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
