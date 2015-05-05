var mysql = require('mysql');

var environment_settings = {
	dbConnectionSettings: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'main',
      connectionLimit: 10,
      supportBigNumbers: true
	},
  table: 'users'
};

var db = environment_settings.table;
var pool = mysql.createPool(environment_settings.dbConnectionSettings);

//retrieve the user information of one user
exports.get = function(username, callback) {
  var sql = "SELECT * FROM ?? WHERE username=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, [db, username], function(error, user){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          console.log('good query');
          callback('', user);
        }
      });
    }
  });
};

//to add a new user to the users database
exports.add = function(newUser, callback) {
  var sql = "INSERT INTO ?? SET ?";
  console.log('inserting user:' + newUser);
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, [db, newUser], function(error, result){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          console.log('good insert');
          callback('',result);
        }
      });
    }
  });
};

//returns all entries that match any set of key pairs
exports.query = function(queryObj, callback) {
  var queryKeys = Object.keys(queryObj);
  console.log('searching for:' + queryObj);
  var sql = "SELECT * FROM ?? WHERE ";
  queryKeys.forEach( function(key, index) {
    if(index > 0 && index < queryKeys.length){
      sql = sql + " AND ";
    }
    sql = sql + key + "='" + queryObj[key] + "'";
  });
  console.log('using query:' + sql);
  pool.getConnection(function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, db, function(error,results){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          console.log('good query');
          callback('',results);
        }
      });
    }
  });
};

//to modify EXISTING entries in the users table for one user only
exports.put = function(updatedUser, callback) {
  var sql = "UPDATE ?? SET ?? WHERE username=?";
  var uidOfObjectToUpdate = updatedUser.username;
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
        console.log('good connection');
        connection.query(sql, [db, updatedUser, uidOfObjectToUpdate], function(error, results){
          connection.release();
          if(error){
            console.log(error);
            callback(error);
          }
          else{
            console.log('good query');
            console.log('rows affected:' + results.changedRows);
            callback('',results);
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
      console.log('good connection');
      connection.query(sql, [db, username], function(error,results){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          console.log('good query');
          console.log('rows affected:' + results.affectedRows);
          callback('', results);
        }
      });
    }
  });
};
