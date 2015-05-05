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
    table: 'users' ////////change me for users/chats tables
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
        console.log('good connection');
        connection.query(sql, [db, 'bob'], function(error, chat){
            connection.release();
            if(error){
                console.log(error);
            }
            else{
                console.log('good query');
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
pool.getConnection( function(error, connection) {
    if(error){
        console.log('oh god nothing works');
    }
    else{
        console.log('good connection');
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
//deletes all chats from the table from a certain sender
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
/*
//inserts a new user into the table
var newUser = {username:'bob@gmail.com',password:'Poopoo1',name:'bob jones',age:49,school:'UMass Amherst'};
sql = "INSERT INTO ?? SET ?";
console.log(newUser);
pool.getConnection( function(error, connection) {
    if(error) {
        console.log(error);
    }
    else{
        console.log('good connection');
        connection.query(sql, [db, newUser], function(error, result){
            connection.release();
            if(error){
                console.log(error);
            }
            else{
                console.log('good insert');
                console.log(result);
            }
        });
    }
});
*/
/*
//returns all entries that match any set of key pairs
var queryObj = {age:20,school:'UMass Amherst'};
var queryKeys = Object.keys(queryObj);
console.log('searching for:' + queryObj);
sql = "SELECT * FROM ?? WHERE ";
queryKeys.forEach( function(key, index) {
    if(index > 0 && index < queryKeys.length){
        sql = sql + " AND ";
    }
    sql = sql + key + "='" + queryObj[key] + "'";
});
console.log(sql);
pool.getConnection(function(error, connection) {
    if(error) {
        console.log(error);
    }
    else{
        console.log('good connection');
        connection.query(sql, db, function(error,results){
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
//to modify EXISTING entries in the users table for one user only
var updatedUser = {username:'bob@gmail.com',age:49}; //change age to test
sql = "UPDATE ?? SET ? WHERE username=?";
var uidOfObjectToUpdate = updatedUser.username;
if(!uidOfObjectToUpdate){
    console.log('no username entered');
}
else{
    pool.getConnection(function(error,connection){
        if(error){
            console.log(error);
        }
        else{
            console.log('good connection');
            connection.query(sql, [db, updatedUser, uidOfObjectToUpdate], function(error, results){
                connection.release();
                if(error){
                    console.log(error);
                }
                else{
                    console.log('good query');
                    console.log('rows affected:' + results.changedRows);
                }
            });
        }
    });
}
*/
/*
//to delete ONE user from the table
sql = "DELETE FROM ?? WHERE username=?";
pool.getConnection( function(error, connection) {
    if(error) {
        console.log(error);
    }
    else{
        console.log('good connection');
        connection.query(sql, [db, 'joe@yahoo.com'], function(error, results){
            connection.release();
            if(error){
                console.log(error);
            }
            else{
                console.log('good query');
                console.log('rows affected:' + results.affectedRows);
            }
        });
    }
});
*/