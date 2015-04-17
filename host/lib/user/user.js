// # User Library
//****************************************************************************
//**********THIS IS JUST A TEMPLATE. DO NOT KEEP THIS CODE***************
//****************************************************************************
// ## User Objects
function User(username, password, uid, priv) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
  this.priviledge = 'user';
  if(priv === 'admin'){this.priviledge = 'admin';}
  this.isAdmin = (this.priviledge === "admin");
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1, 'user'),
  new User('hazel', 'lezah', 2, 'user'),
  new User('caleb', 'belac', 3, 'user'),
  new User('admin', 'nimda', 4, 'admin')
];

//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

exports.add = function(name, pass, admin, cb){
  var notexists = this.lookup(name, pass, function(err, user){
    if(err === 'user not found'){
      return true;
    }
    else{
      return false;
    }
  });
  if(notexists){
    var uid = userdb.length + 1;
    userdb.push(new User(name,pass,uid,admin));
    //debugging
    console.log(userdb[uid]);
    cb(userdb[uid]);
  }
  else{
    cb(undefined);
  }
};

