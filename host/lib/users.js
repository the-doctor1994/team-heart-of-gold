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

//retrieve the user information of one user
exports.get = function(username, callback) {
  var sql = "SELECT FROM users WHERE username=?";
  
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, username, function(error, user){
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

  var sql = "INSERT INTO users SET ?";

  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, newUser, function(error){
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
  //var queryKeys = Object.getOwnPropertyNames(queryObj);
  
  var sql = "SELECT * FROM users WHERE";
  queryObj.forEach( function(key, index) {
    if(index > 0){
      sql.concat(" AND ");
    }
    sql.concat(" ", key, "='", queryObj[key], "'");
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

  var sql = "UPDATE users SET ? WHERE username=?";

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
        connection.query(sql, [userKeys, uidOfObjectToUpdate], function(error){
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
  var sql = "DELETE FROM users WHERE username=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, username, function(error){
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
