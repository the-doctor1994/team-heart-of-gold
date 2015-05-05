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
  table: 'chats'
};

var db = environment_settings.table;
var pool = mysql.createPool(environment_settings.dbConnectionSettings);

//finds all messages from one user
exports.get = function(sender, callback) {
  var sql = "SELECT * FROM ?? WHERE sender=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, [db, sender], function(error, results){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          console.log('good query');
          callback('', results);
        }
      });
    }
  });
};

//inserts a new message
exports.add = function(newChat, callback) {
  var sql = "INSERT INTO ?? values (?,?,NOW(),?)";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, [db,newChat.sender,newChat.receiver,newChat.message], function(error, result){
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

//returns all entries that match a sender and receiver
exports.query = function(criteria, callback) {
  var sql = "SELECT * FROM ?? WHERE sender=? AND receiver=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, [db, criteria.sender, criteria.receiver], function(error,results){
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

//to add messages to a conversation
/*    ##########DEPRECATED##########
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
*/
//deletes all chats from the table from a certain sender
exports.delete = function(sender, callback){
  var sql = "DELETE FROM ?? WHERE sender=?";
  pool.getConnection( function(error, connection) {
    if(error) {
      console.log(error);
      callback(error);
    }
    else{
      console.log('good connection');
      connection.query(sql, [db, sender], function(error, result){
        connection.release();
        if(error){
          console.log(error);
          callback(error);
        }
        else{
          console.log('good delete');
          callback('', 'rows deleted:' + result.affectedRows);
        }
      });
    }
  });
};
