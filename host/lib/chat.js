var mysql = require('mysql');

var environment_settings = {
    dbConnectionSettings: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'main',
      connectionLimit: 10,
      supportBigNumbers: true
    },
  table: 'chat'
};

var db = environment_settings.table;
var pool = mysql.createPool(environment_settings.dbConnectionSettings);

//retrieve a chat log
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

//to add a new conversation to the database
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
          callback('',newChat);
        }
      });
    }
  });
};

//returns all entries that match any set of key pairs
exports.query = function(queryObj, callback) {
  var queryKeys = Object.keys(queryObj);

  var sql = "SELECT * FROM ?? WHERE";
  queryKeys.forEach( function(key, index) {
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

//to add messages to a conversation
exports.put = function(updatedConvo, callback) {
  //var objKeys = Object.keys(updatedConvo);

  var sql = "UPDATE ?? SET ?? WHERE username=?";

  var chatidOfObjectToUpdate = updatedConvo[chatid];
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
        connection.query(sql, [db, updatedConvo, chatidOfObjectToUpdate], function(error){
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

//to delete a chat from the table
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
