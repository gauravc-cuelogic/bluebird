"use strict"

const DB = require('./db_connection.js');

var authenticateUser = function (authKey, cb){
  if(authKey && authKey !== ''){
    connection.query({
        sql: 'select id from users where login_auth_key = ?;',
        timeout: 40000,
        values: [authKey],
        }, function(err, rows, fields) {
            if (err) throw err;
            if(rows.length > 0){
              cb && cb(true);
            } else {
              connection.end();
              cb && cb(false);
            }
      });
  }
}

var endConnection = function () {
  /* No need to end connection */
  //connection.end();
}

var findData = function (sql, values, cb){

    connection.query({
        sql: sql,
        timeout: 40000,
        values: values,
        }, function(err, rows, fields) {
            if (err) throw err;
            cb && cb(rows);
      });
}

var createFriends = function (userId, friends){
  var friendList = friends.split(",");

  connection.query({sql: "DELETE FROM `friends` WHERE `user_id` = ?", timeout: 40000, values: [userId] });

  friendList.forEach(function (key, value){
    connection.query({sql: "INSERT INTO `friends`(`user_id`, `friend_id`) \
                    VALUES (?, (select id from users where name = ? limit 1) )",
                    timeout: 40000,
                    values: [userId, key] });
  });
}

module.exports = {
  authenticateUser: authenticateUser,
  findData: findData,
  endConnection: endConnection,
  createFriends: createFriends
}
