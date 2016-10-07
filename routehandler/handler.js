"use strict"

const DB = require('../model/db_connection');
const uuid = require('node-uuid');

module.exports.login = function (request, reply) {
  DB.connection.queryAsync("select id from users where is_deleted = 0 and username = ? and password= ?",[request.payload.username,request.payload.password])
                .then(function(data){
                  if(data.length > 0 && data[0].id){
                    return new Promise(function (resolve, reject){
                      resolve(data);
                    });
                  }else{
                    reply('No record Found');
                  }
                })
                .then(function (data){
                  var loginKey = uuid.v1();
                  DB.connection.queryAsync("UPDATE 'users' SET 'login_auth_key' = ? WHERE 'id' = ?;", [loginKey, data[0].id])
                                .then(function(data){
                                  reply(loginKey);
                                });
                });

};

module.exports.register = function (request, reply) {
  var payload = [request.payload.name, request.payload.username, request.payload.password, request.payload.email,
                  request.payload.phone, request.payload.address];

  DB.connection.queryAsync("INSERT INTO users (name, username, password, email, phone, address) \
                            VALUES ( ?, ?, ?, ?, ?, ?);", payload)
         .then(function(data){
            //DB.createFriends(data.insertId,request.payload.friends)
            reply(data);
          })
          .catch(function (err){
            reply(err);
          });

};
