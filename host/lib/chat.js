var mysql = require('node-mysql');

var environment_settings = {
  dbConnectionSettings: {
    host: 'mysql3.000webhost.com',
    user: 'admin',
    password: 'honeypot94',
    database: 'a9606264_chat',
    connectionLimit: 10,
    supportBigNumbers: true
  }
};

var db = environment_settings.dbConnectionSettings.database;
var pool = mysql.createPool(environment_settings.dbConnectionSettings);

//retrieve the user information of one user
exports.get = function(chatid, callback) {
  var sql = "SELECT FROM ?? WHERE chatid=?";

  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, [db, chatid], function(error, chat){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          callback('', chat);
        }
      });
    }
  });
};

//to add a new user to the users database
exports.add = function(newChat, callback) {

  var sql = "INSERT INTO ?? SET ?";

  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, [db, newChat], function(error){
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

  var sql = "SELECT * FROM ?? WHERE";
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
exports.put = function(updatedConvo, callback) {
  var userKeys = Object.getOwnPropertyNames(updatedConvo);

  var sql = "UPDATE ?? SET ?? WHERE username=?";

  var chatidOfObjectToUpdate = updatedConvo[username];
  if(!chatidOfObjectToUpdate){
    callback('no username entered');
  }
  else{
    pool.getConnection(function(error,connection){
      if(error){
        console.log(error);
        callback(error);
      }
      else{
        connection.query(sql, [db, userKeys, chatidOfObjectToUpdate], function(error){
          connection.release();
          if(error){
            console.log(error);
            callback(error);
          }
          else{
            callback('',updatedConvo);
          }
        });
      }
    });
  }
};

//to delete ONE user from the table
exports.delete = function(chatid, callback){
  var sql = "DELETE FROM ?? WHERE username=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      connection.query(sql, [db, chatid], function(error){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          callback('', chatid);
        }
      });
    }
  });
};
