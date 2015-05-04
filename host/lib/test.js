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


var sql = "";
/*
//finds all messages from one user
sql = "SELECT * FROM ?? WHERE sender=?";
pool.getConnection( function(error, connection) {
    if(error) {
        console.log(error);
    }
    else{
        connection.query(sql, [db, 'bob'], function(error, chat){
            connection.release();
            if(error){
                console.log(error);
            }
            else{
                console.log(chat);
            }
        });
    }
});
*/
/*
//inserts a new message
sql = "INSERT INTO ?? values (?,?,NOW(),?)";
var newChat = {sender:"jim", receiver:"bob", message:"whats up doc"};
//var inserts = [db,newChat.sender,newChat.receiver,newChat.message];
pool.getConnection( function(error, connection) {
    if(error){
        console.log('oh god nothing works');
    }
    else{
        console.log('good connection');
        //sql = mysql.format(sql, inserts);
        connection.query(sql, [db,newChat.sender,newChat.receiver,newChat.message], function(error){
            if(error){
                connection.release();
                console.log('something else broke');
            }
            else{
                console.log('good insert');
                connection.query("SELECT * FROM ?? WHERE sender=?", [db, 'jim'], function(error, chat){
                    connection.release();
                    if(error){
                        console.log('well fuck me');
                    }
                    else{
                        console.log('good query');
                        console.log(chat);
                    }
                });
            }
        });
    }
});
*/
/*
//returns all entries that match a sender and receiver
var criteria = {sender:"bob", receiver:"jim"};
sql = "SELECT * FROM ?? WHERE sender=? AND receiver=?";
pool.getConnection( function(error, connection) {
    if(error) {
        console.log(error);
    }
    else{
        console.log('good connection');
        connection.query(sql, [db, criteria.sender, criteria.receiver], function(error,results){
            connection.release();
            if(error){
                console.log(error);
            }
            else{
                console.log('good query');
                console.log(results);
            }
        });
    }
});
*/
/*
//deletes all chats from the table from a certain user
sql = "DELETE FROM ?? WHERE sender=?";
pool.getConnection( function(error, connection) {
    if(error) {
        console.log(error);
    }
    else{
        console.log('good connection');
        connection.query(sql, [db, 'jim'], function(error, result){
            connection.release();
            if(error){
                console.log(error);
            }
            else{
                console.log('good delete');
                console.log('rows deleted:' + result.affectedRows);
            }
        });
    }
});
*/